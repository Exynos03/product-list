import React from "react";
import AntSwitch from "./AntSwitch";

interface CombinationProps {
  combinations: {
    name: string;
    sku: string;
    quantity: string;
    inStock: boolean;
  }[];
  handleChange: (
    index: number,
    field: "sku" | "quantity" | "inStock",
    value: string | number | boolean,
  ) => void;
  errors: { sku?: string; quantity?: string }[];
  setErrors: React.Dispatch<
    React.SetStateAction<{ sku?: string; quantity?: string }[]>
  >;
}

const Combinations: React.FC<CombinationProps> = ({
  combinations,
  handleChange,
  errors,
  setErrors,
}) => {
  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-4 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left mb-6">
        Combinations
      </p>

      {combinations.map((combination, index) => (
        <div
          key={index}
          className="flex justify-start items-center align-middle gap-4"
        >
          {/* Combination Name */}
          <p className="w-1/5 font-['Work_Sans'] text-sm font-normal leading-[16.42px] text-left">
            {combination.name}
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
              value={combination.sku}
              placeholder="Enter SKU value/ID"
              onChange={(e) => {
                handleChange(index, "sku", e.target.value);
                setErrors((prev) => {
                  const newErrors = [...prev];
                  newErrors[index] = { ...newErrors[index], sku: undefined };
                  return newErrors;
                });
              }}
              className={`border p-2.5 rounded-[8px] font-['Work_Sans'] text-sm font-normal leading-[16.42px] outline-none ${
                errors[index]?.sku ? "border-red-500" : "border-[#0000002E]"
              }`}
            />
            {errors[index]?.sku && (
              <p className="absolute text-red-500 text-xs">
                {errors[index].sku}
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
              checked={combination.inStock}
              onChange={() => {
                handleChange(index, "inStock", !combination.inStock);
                setErrors((prev) => {
                  const newErrors = [...prev];
                  newErrors[index] = {
                    ...newErrors[index],
                    quantity: undefined,
                  };
                  return newErrors;
                });
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
              placeholder={!combination.inStock ? "" : "Enter quantity"}
              disabled={!combination.inStock}
              style={!combination.inStock ? { backgroundColor: "#E2E8F0" } : {}}
              value={combination.inStock ? combination.quantity : ""}
              onChange={(e) => {
                handleChange(index, "quantity", parseInt(e.target.value) || 0);
                setErrors((prev) => {
                  const newErrors = [...prev];
                  newErrors[index] = {
                    ...newErrors[index],
                    quantity: undefined,
                  };
                  return newErrors;
                });
              }}
              className={`border p-2.5 rounded-[8px] font-['Work_Sans'] text-sm font-normal leading-[16.42px] outline-none ${
                errors[index]?.quantity
                  ? "border-red-500"
                  : "border-[#0000002E]"
              }`}
            />
            {errors[index]?.quantity && (
              <p className="absolute text-red-500 text-xs">
                {errors[index].quantity}
              </p>
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Combinations;
