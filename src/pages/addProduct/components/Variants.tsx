import { RiDeleteBinLine } from "react-icons/ri";
import { MuiChipsInput } from "mui-chips-input";
import React from "react";

interface VariantItem {
  id: number;
  field1: string; // Single input field
  field2: string[]; // Array of strings for the chips input
}

interface VariantsProps {
  data: VariantItem[];
  handleFieldChange: (
    id: number,
    fieldName: keyof VariantItem,
    value: string | string[],
  ) => void;
  addNewField: () => void;
  removeField: (id: number) => void;
  variantErrors: { [key: number]: string }; // Errors by ID
  setVariantErrors: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
}

const Variants: React.FC<VariantsProps> = ({
  data,
  handleFieldChange,
  addNewField,
  removeField,
  variantErrors,
  setVariantErrors,
}) => {
  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-5 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left">
        Variants
      </p>

      {data.map((item) => {
        const field1Error = variantErrors[item.id]?.includes("Option");
        const field2Error = variantErrors[item.id]?.includes("Values");

        return (
          <div
            key={item.id}
            className="flex gap-2 w-full justify-start items-center align-middle"
          >
            {/* Option Field */}
            <label className="flex flex-col gap-1 w-full sm:w-2/5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
              Option*
              <div className="relative w-full">
                <input
                  name="option"
                  value={item.field1}
                  onChange={(e) => {
                    handleFieldChange(item.id, "field1", e.target.value);
                    setVariantErrors((prev) => {
                      const { [item.id]: removed, ...rest } = prev; // Clear errors for the current field
                      return rest;
                    });
                  }}
                  placeholder="Enter the option"
                  className={`border ${
                    field1Error ? "border-red-500" : "border-[#0000002E]"
                  } rounded-[8px] p-[10.5px] font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none w-full`}
                />
                {field1Error && (
                  <p className="absolute text-red-500 text-[12px] font-normal mt-1 left-0 top-full">
                    {variantErrors[item.id]}
                  </p>
                )}
              </div>
            </label>

            {/* Values (Chips Input) */}
            <label className="flex flex-col gap-1 w-full sm:w-3/5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
              Values*
              <div className="relative w-full">
                <MuiChipsInput
                  size="small"
                  variant="outlined"
                  value={item.field2}
                  onChange={(chips) => {
                    handleFieldChange(item.id, "field2", chips);
                    setVariantErrors((prev) => {
                      const { [item.id]: removed, ...rest } = prev; // Clear errors for the current field
                      return rest;
                    });
                  }}
                  sx={{
                    fontSize: "14px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: field2Error ? "#F44336" : "#0000002E",
                        borderRadius: "8px",
                        padding: "0px",
                      },
                      "&:hover fieldset": {
                        borderColor: field2Error ? "#F44336" : "#0000002E",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: field2Error ? "#F44336" : "#0000002E",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: "normal",
                    },
                  }}
                  className="w-full"
                />
                {field2Error && (
                  <p className="absolute text-red-500 text-[12px] font-normal mt-1 left-0 top-full">
                    {variantErrors[item.id]}
                  </p>
                )}
              </div>
            </label>

            {/* Delete Button */}
            <RiDeleteBinLine
              size={20}
              color="#EE2A2A"
              className="cursor-pointer mt-4"
              onClick={() => removeField(item.id)}
            />
          </div>
        );
      })}

      {/* Add New Field Button */}
      <div className="flex justify-start">
        <button
          type="button"
          className="text-white bg-[#1A73E8] rounded-[8px] py-2 px-4 mt-4"
          onClick={addNewField}
        >
          Add New Variant
        </button>
      </div>
    </form>
  );
};

export default Variants;
