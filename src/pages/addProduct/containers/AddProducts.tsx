import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../commonComponents/Sidebar";
import Topbar from "../../../commonComponents/Topbar";
import FormTimeline from "../components/FormTimeline";
import Description from "../components/Description";
import Variants from "../components/Variants";
import Combinations from "../components/Combinations";
import PriceInfo from "../components/PriceInfo";
import { useFormik } from "formik";
import { FormDataSchema } from "../../../schemas";
import toast from "react-hot-toast";
import JsonModal from "../../../Modals/JSONModal";

interface Item {
  id: number;
  field1: string;
  field2: string[];
}

interface Combination {
  name: string;
  sku: string;
  quantity: string;
  inStock: boolean;
}

interface FormValues {
  category: string;
  product_name: string;
  brand_name: string;
  price: string;
  discount: string;
  method: "pct" | "flat";
}

const AddProducts: React.FC = () => {
  const catList = localStorage.getItem("catList");
  const parsedCatList: string[] = catList ? JSON.parse(catList) : []; 
  const [currentForm, setCurrentForm] = useState<number>(0);
  const[showJsonModal, setShowJsonModal] = useState<boolean>(false)
  const[productJson, setProductJson] = useState({})
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [variantObject, setVariantObject] = useState<Item[]>([
    { id: 1, field1: "", field2: [] },
  ]);
  const [combinationObject, setCombinationObject] = useState<Combination[]>([]);
  const [variantErrors, setVariantErrors] = useState<{ [key: number]: string }>(
    {},
  );
  const [combinationError, setCombinationError] = useState<
    { sku?: string; quantity?: string }[]
  >([]);

  const navigate = useNavigate();

  const initialValues: FormValues = {
    category: "",
    product_name: "",
    brand_name: "",
    price: "",
    discount: "",
    method: "pct",
  };

  const combineArrays = (...arrays: string[][]): string[] => {
    return arrays.reduce<string[]>(
      (acc, currArray, index) => {
        const result: string[] = [];
        acc.forEach((accItem) => {
          currArray.forEach((currItem) => {
            result.push(
              index === 0 ? `${accItem}${currItem}` : `${accItem}/${currItem}`,
            );
          });
        });
        return result;
      },
      [""],
    );
  };

  const handleFieldChange = (
    id: number,
    fieldName: keyof Item,
    value: string,
    index: number | null = null,
  ): void => {
    setVariantObject((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              [fieldName]:
                index !== null
                  ? item[fieldName]?.map((field, i) =>
                      i === index ? value : field,
                    )
                  : value,
            }
          : item,
      ),
    );
  };

  const addNewField = (): void => {
    setVariantObject((prevData) => [
      ...prevData,
      { id: prevData.length + 1, field1: "", field2: [] },
    ]);
  };

  const removeField = (id: number): void => {
    if (variantObject.length < 2) {
      toast.error("Need to have at least one option and values");
      return;
    }
    setVariantObject((prevData) => prevData.filter((item) => item.id !== id));
  };

  const { values, errors, handleChange, setErrors, setFieldValue } =
    useFormik<FormValues>({
      initialValues,
      validationSchema: FormDataSchema,
      onSubmit: () => {
        console.log(
          !(
            "product_name" in errors ||
            "category" in errors ||
            "brand_name" in errors
          ),
        );
      },
    });

  const handleDescriptionSaveClick = () => {
    if (
      (
        values.product_name.length > 0 &&
        values.category.length > 0 &&
        values.brand_name.length > 0 &&
        image
      )
    ) {
      setCurrentForm((prevVal) => prevVal + 1);
      setErrors({});
    }
    else {
      toast.error("Please fill out all fields to move to the next page")
      return;
    }
  };

  const handleVariantSaveClick = () => {
    const newVariantErrors: { [key: number]: string } = {};

    variantObject.forEach((item) => {
      if (!item.field1.trim()) {
        newVariantErrors[item.id] = "Option can't be empty";
      } else if (item.field2.length === 0) {
        newVariantErrors[item.id] = "Values should have at least one value";
      }
    });

    if (Object.keys(newVariantErrors).length === 0) {
      const combinationArray = combineArrays(
        ...variantObject.map((item) => item.field2),
      );
      const desiredArr = combinationArray.map((variant) => ({
        name: variant,
        sku: "",
        quantity: "",
        inStock: false,
      }));
      setCombinationObject(desiredArr);
      setCombinationError(desiredArr.map(() => ({})));
      setCurrentForm(2);
    }

    setVariantErrors(newVariantErrors);
  };

  const handleCombinationSaveClick = () => {
    const skuOccurrences: Record<string, number[]> = {};

    combinationObject.forEach((combination, index) => {
      const sku = combination.sku.trim();
      if (sku) {
        if (!skuOccurrences[sku]) {
          skuOccurrences[sku] = [];
        }
        skuOccurrences[sku].push(index);
      }
    });

    const newErrors = combinationObject.map((combination, index) => {
      const error: { sku?: string; quantity?: string } = {};

      if (!combination.sku.trim()) {
        error.sku = "SKU is required";
      }

      const skuIndexes = skuOccurrences[combination.sku.trim()] || [];
      if (
        skuIndexes.length > 1 &&
        skuIndexes[skuIndexes.length - 1] === index
      ) {
        error.sku = "Duplicate SKU";
      }

      if (combination.inStock && Number(combination.quantity) <= 0) {
        error.quantity = "Enter valid stock value";
      }

      return error;
    });

    setCombinationError(newErrors);

    if (!newErrors.some((error) => Object.keys(error).length > 0)) {
      setCurrentForm(3);
    }
  };

  const handlePriceSectionSaveClick = () => {
    if ((Number(values.price) > 0 )) {
      const category = parsedCatList.map((item) => ({
        id: 1, 
        name: item,
      }));
      const product = { 
        product :{
        name: values.product_name,
        category: values.category,
        brand: values.brand_name,
        image: image ? image.name : "",
        variants: variantObject.map((variant) => ({
          name: variant.field1,
          values: variant.field2,
        })),
        combinations: combinationObject.reduce((acc, combination, index) => {
          const key = String.fromCharCode(97 + index);
          acc[key] = {
            name: combination.name,
            sku: combination.sku,
            quantity: combination.quantity,
            inStock: combination.inStock,
          };
          return acc;
        }, {}),
        priceInr: parseFloat(values.price),
        discount: {
          method: values.method,
          value: parseFloat(values.discount),
        },
      },
      categories : category
    }
      console.log(category)
      setProductJson(product)
      setShowJsonModal(true)
      console.log(product);
      toast.success("Please check console. Output is printed on console");
    } else {
      toast.error("Please fill out Price to add the product")
      return;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const formArrayComponent = [
    <Description
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleImageUpload={handleImageUpload}
      imageName={imageName}
    />,
    <Variants
      data={variantObject}
      handleFieldChange={handleFieldChange}
      addNewField={addNewField}
      removeField={removeField}
      variantErrors={variantErrors}
      setVariantErrors={setVariantErrors}
    />,
    <Combinations
      combinations={combinationObject}
      handleChange={(index, field, value) =>
        setCombinationObject((prev) =>
          prev.map((combination, i) =>
            i === index ? { ...combination, [field]: value } : combination,
          ),
        )
      }
      errors={combinationError}
      setErrors={setCombinationError}
    />,
    <PriceInfo
      values={values}
      errors={errors}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
    />,
  ];

  const handleSaveButtonArray = [
    handleDescriptionSaveClick,
    handleVariantSaveClick,
    handleCombinationSaveClick,
    handlePriceSectionSaveClick,
  ];

  return (
    <section className="flex w-full">
      <Sidebar />
      { showJsonModal && <JsonModal isOpen={showJsonModal} onClose={setShowJsonModal} jsonData ={productJson}/>}
      <section className="flex flex-col justify-start align-middle w-4/5 cr:w-4/6 h-screen">
        <Topbar
          heading="Add Product"
          btn1Text={currentForm === 0 ? "Cancel" : "Back"}
          btn2Text={currentForm === 3 ? "Confirm" : "Next"}
          btn1Navigation={
            currentForm === 0
              ? () => navigate("/Products")
              : () => setCurrentForm((prevVal) => prevVal - 1)
          }
          btn2Navigation={() => handleSaveButtonArray[currentForm]()}
        />
        <section className="w-3/6 p-6 pt-0 mt-[-8px]">
          <FormTimeline
            sections={["Description", "Variants", "Combinations", "Price info"]}
            isActiveSectionIndex={currentForm}
          />
          {formArrayComponent[currentForm]}
        </section>
      </section>
    </section>
  );
};

export default AddProducts;
