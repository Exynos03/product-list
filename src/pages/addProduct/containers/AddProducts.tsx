import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../commonComponents/Sidebar";
import Topbar from "../../../commonComponents/Topbar";
import FormTimeline from "../components/FormTimeline";
import Description from "../components/Description";
import Variants from "../components/Variants";
import Combinations from "../components/Combinations";
import PriceInfo from "../components/PriceInfo";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDataSchema } from "../../../schemas";
import JsonModal from "../../../Modals/JSONModal";

interface Variant {
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
  image: FileList | null;
  price: string;
  discount: string;
  method: "pct" | "flat";
  variants: Variant[];
  combinations: Combination[];
}

const initialValues: FormValues = {
  category: "",
  product_name: "",
  brand_name: "",
  image: null,
  price: "",
  discount: "",
  method: "pct",
  variants: [{ field1: "", field2: [] }],
  combinations: [{ name: "", sku: "", quantity: "", inStock: false }],
};

const AddProducts: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { watch, trigger } = methods;
  const catList = localStorage.getItem("catList");
  const parsedCatList: string[] = catList ? JSON.parse(catList) : [];
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [productJson, setProductJson] = useState<Record<string, any>>({});

  const handleDescriptionSaveClick = async () => {
    const isValid = await trigger(["product_name", "category", "brand_name", "image"]);
    if (isValid) {
      setCurrentForm(1);
    }
  };

  const handleVariantSaveClick = async () => {
    const isValid = await trigger("variants");
    if (isValid) setCurrentForm(2);
  };

  const handleCombinationSaveClick = async () => {
    const isValid = await trigger("combinations");
    if (isValid) setCurrentForm(3);
  };

  const handlePriceSectionSaveClick = async () => {
    const isValid = await trigger(["price", "discount", "method"]);
    if (isValid) {
      const category = parsedCatList.map((item) => ({ id: 1, name: item }));
      const products = {
        product: {
          name: watch().product_name,
          category: watch().category,
          brand: watch().brand_name,
          image: watch().image?.[0]?.name,
          priceInr: watch().price,
          discount: {
            method: watch().method,
            value: watch().discount
          },
          variants: watch().variants.map( (variant) => ({
            "name" : variant.field1,
            "values": variant.field2
          })),
          combinations: watch().combinations.map( (item, index) => ({
            [index+1]: item,
          }))
        },
        categories: category,
      };
      setProductJson(products);
      setShowJsonModal(true);
    }
  };

  const formArrayComponent = [
    <Description />,
    <Variants />,
    <Combinations />,
    <PriceInfo />,
  ];

  const handleSaveButtonArray = [
    handleDescriptionSaveClick,
    handleVariantSaveClick,
    handleCombinationSaveClick,
    handlePriceSectionSaveClick,
  ];

  return (
    <FormProvider {...methods}>
      <section className="flex w-full">
        <Sidebar />
        {showJsonModal && (
          <JsonModal
            isOpen={showJsonModal}
            onClose={() => setShowJsonModal(false)}
            jsonData={productJson}
          />
        )}
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
    </FormProvider>
  );
};

export default AddProducts;
