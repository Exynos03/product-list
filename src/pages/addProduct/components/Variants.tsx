import { RiDeleteBinLine } from "react-icons/ri";
import { MuiChipsInput } from "mui-chips-input";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useFieldArray, useFormContext } from "react-hook-form";

const Variants: React.FC = () => {
  const {
    control,
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();


  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants", // Matches the name in the schema
  });

  // Watch for live form state updates
  const variants = watch("variants");

  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-5 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left">
        Variants
      </p>

      {fields.map((item, index) => {
        const field1Error = errors?.variants?.[index]?.field1;
        const field2Error = errors?.variants?.[index]?.field2;

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
                  {...register(`variants[${index}].field1`)}
                  defaultValue={item.field1} // Important to set default value for useFieldArray
                  placeholder="Enter the option"
                  className={`border ${
                    field1Error ? "border-red-500" : "border-[#0000002E]"
                  } rounded-[8px] p-[10.5px] font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none w-full`}
                  onBlur={() => clearErrors(`variants[${index}].field1`)}
                />
                {field1Error && (
                  <p className="absolute text-red-500 text-[12px] font-normal mt-1 left-0 top-full">
                    {field1Error.message}
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
                  value={variants?.[index]?.field2 || []}
                  onChange={(chips) => {
                    clearErrors(`variants[${index}].field2`);
                    setValue(`variants[${index}].field2`, chips);
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
                  }}
                  className="w-full"
                />
                {field2Error && (
                  <p className="absolute text-red-500 text-[12px] font-normal mt-1 left-0 top-full">
                    {field2Error.message}
                  </p>
                )}
              </div>
            </label>

            {/* Delete Button */}
            <RiDeleteBinLine
              size={20}
              color="#EE2A2A"
              style={index === 0 ? {opacity:"0"} : {}}
              className="cursor-pointer mt-4"
              onClick={() => {
                if (fields.length > 1) {
                  remove(index);
                } else {
                  setError("variants", {
                    type: "manual",
                    message: "You must have at least one variant.",
                  });
                }
              }}
            />
          </div>
        );
      })}

      {/* Add New Field Button */}
      <div className="flex justify-start items-center align-middle py-2 px-4 mt-4 gap-2 cursor-pointer">
        <FaPlus color="#1F8CD0" size={16} />
        <button
          type="button"
          className="font-['Work_Sans'] text-[#1F8CD0] text-[14px] font-medium text-left"
          onClick={() => append({ field1: "", field2: [] })}
        >
          Add Option
        </button>
      </div>
    </form>
  );
};

export default Variants;
