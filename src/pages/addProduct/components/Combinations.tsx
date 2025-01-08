import React, { useEffect } from "react";
import { useFormContext, useFieldArray, FieldValues, FieldError } from "react-hook-form";
import AntSwitch from "./AntSwitch";

interface Variant {
  field2: string[]; // Options for the variant
}

interface Combination {
  name: string;
  sku: string;
  quantity: string;
  inStock: boolean;
}

interface CombinationsFormValues {
  variants: Variant[];
  combinations: Combination[];
}

const combineArrays = (...arrays: string[][]): string[] => {
  if (arrays.length === 0) return [];
  return arrays
    .reduce<string[]>((acc, currArray) =>
      acc.flatMap((accItem) =>
        currArray.map((currItem) => `${accItem}${accItem ? "/" : ""}${currItem}`)
      ),
      [""] // Start with an empty string to handle the first combination properly
    )
    .filter((combination) => combination.trim() !== ""); // Remove empty combinations
};

const Combinations: React.FC = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CombinationsFormValues>();
  const { fields } = useFieldArray({
    control,
    name: "combinations",
  });

  // Watch for variants and combinations
  const variants = watch("variants") ?? [];
  const combinations = watch("combinations") ?? [];

  // Function to check if two array of object are identical by their name field or not
  const isCombinationsSame = (
    arr1: { name: string }[],
    arr2: { name: string }[]
  ): boolean => {

    // Check if lengths are the same
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Sort both arrays by the `name` property (if order doesn't matter)
    const sortedArr1 = arr1.slice().sort((a, b) => a.name.localeCompare(b.name));
    const sortedArr2 = arr2.slice().sort((a, b) => a.name.localeCompare(b.name));
  
    // Compare each object's `name` property
    return sortedArr1.every((obj, index) => obj.name === sortedArr2[index].name);
  }

  // Recalculate combinations when variants change
  useEffect(() => {
    if (variants.length > 0) {
      const optionArrays = variants.map((variant) => variant.field2 ?? []);
      
      const generatedCombinations = combineArrays(...optionArrays).map((name) => ({
        name,
        sku: "", // Empty SKU initially, could be prefilled if needed
        quantity: "",
        inStock: false,
      }));

      if(!isCombinationsSame(generatedCombinations, combinations)) {
        setValue("combinations", generatedCombinations);
      }
    }
  }, [variants, setValue]); // Recalculate combinations when variants change

  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-4 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left mb-6">
        Combinations
      </p>

      {fields.map((combination, index) => (
        <div key={combination.id} className="flex justify-start items-center align-middle gap-4">
          {/* Combination Name */}
          <p className="w-1/5 font-['Work_Sans'] text-sm font-normal leading-[16.42px] text-left">
            {combinations[index]?.name || ""}
          </p>

          {/* SKU Input */}
          <div className="relative">
            {index === 0 && (
              <p className="absolute top-[-18px] font-['Work_Sans'] text-[12px] font-[400] leading-[14.08px] text-left">
                SKU *
              </p>
            )}
            <input
              type="text"
              {...register(`combinations.${index}.sku`, {
                required: "SKU is required",
                validate: (value) =>
                  value.trim() !== "" || "SKU cannot be empty",
              })}
              placeholder="Enter SKU value/ID"
              className={`border p-2.5 rounded-[8px] font-['Work_Sans'] text-sm font-normal leading-[16.42px] outline-none ${
                errors.combinations?.[index]?.sku ? "border-red-500" : "border-[#0000002E]"
              }`}
            />
            {errors.combinations?.[index]?.sku && (
              <p className="absolute text-red-500 text-xs">
                {errors.combinations[index].sku?.message}
              </p>
            )}
          </div>

          {/* In Stock Toggle */}
          <div className="relative">
            {index === 0 && (
              <p className="absolute whitespace-nowrap left-[-3px] top-[-18px] font-['Work_Sans'] text-[12px] font-[400] leading-[14.08px] text-left">
                In stock
              </p>
            )}
            <AntSwitch
              checked={combinations[index]?.inStock}
              onChange={() => {
                setValue(
                  `combinations.${index}.inStock`,
                  !combinations[index]?.inStock
                );
              }}
            />
          </div>

          {/* Quantity Input */}
          <div className="relative">
            {index === 0 && (
              <p className="absolute top-[-18px] font-['Work_Sans'] text-[12px] font-[400] leading-[14.08px] text-left">
                Quantity
              </p>
            )}
            <input
              type="number"
              {...register(`combinations.${index}.quantity`, {
                required: combinations[index]?.inStock
                  ? "Quantity is required when in stock"
                  : false,
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
              placeholder={!combinations[index]?.inStock ? "" : "Enter quantity"}
              disabled={!combinations[index]?.inStock}
              style={
                !combinations[index]?.inStock ? { backgroundColor: "#E2E8F0" } : {}
              }
              className={`border p-2.5 rounded-[8px] font-['Work_Sans'] text-sm font-normal leading-[16.42px] outline-none ${
                errors.combinations?.[index]?.quantity
                  ? "border-red-500"
                  : "border-[#0000002E]"
              }`}
            />
            {errors.combinations?.[index]?.quantity && (
              <p className="absolute text-red-500 text-xs">
                {errors.combinations[index].quantity?.message}
              </p>
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Combinations;
