import React from "react";
import { useFormContext } from "react-hook-form";

const PriceInfo: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const values = watch();

  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-4 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left">
        Price Info
      </p>

      {/* Product Price */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Price*
        <input
          type="number"
          {...register("price")}
          placeholder="Enter price amount"
          className={`border rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none ${
            errors.price ? "border-[#EE2A2A]" : "border-[#0000002E]"
          }`}
        />
        {errors.price && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {String(errors.price.message)}
          </p>
        )}
      </label>

      {/* Discount */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Discount
        <div className="flex w-full gap-4 justify-start align-middle items-center">
          <input
            type="number"
            {...register("discount")}
            placeholder="Enter discount amount"
            className={`border rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none w-full ${
              errors.discount ? "border-[#EE2A2A]" : "border-[#0000002E]"
            }`}
          />

          {/* Discount Method */}
          <div className="flex rounded-[8px] border border-[#E6EEF2] cursor-pointer">
            <div
              onClick={() => setValue("method", "pct")}
              className={`p-2.5 pl-3 pr-3 rounded-tl-[7px] rounded-bl-[7px] ${
                values.method === "pct" ? "bg-[#E6EEF2]" : ""
              }`}
            >
              %
            </div>
            <div
              onClick={() => setValue("method", "flat")}
              className={`p-2.5 pl-3 pr-3 rounded-tr-[7px] rounded-br-[7px] ${
                values.method === "flat" ? "bg-[#E6EEF2]" : ""
              }`}
            >
              ₹
            </div>
          </div>
        </div>
        {errors.discount && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {String(errors.discount.message)}
          </p>
        )}
      </label>
    </form>
  );
};

export default PriceInfo;
