import React from "react";

interface PriceInfoProps {
  values: {
    price: string;
    discount: string;
    method: "pct" | "flat";
  };
  errors: {
    price?: string;
    discount?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: any) => void;
  setErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | undefined }>
  >;
}

const PriceInfo: React.FC<PriceInfoProps> = ({
  values,
  errors,
  handleChange,
  setFieldValue,
  setErrors,
}) => {
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
          name="price"
          value={values.price}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({ ...prev, price: undefined }));
          }}
          placeholder="Enter price amount"
          className={`border rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none ${
            errors.price ? "border-[#EE2A2A]" : "border-[#0000002E]"
          }`}
        />
        {errors.price && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {errors.price}
          </p>
        )}
      </label>

      {/* Discount */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Discount
        <div className="flex w-full gap-4 justify-start align-middle items-center">
          <input
            type="number"
            name="discount"
            value={values.discount}
            onChange={(e) => {
              handleChange(e);
              setErrors((prev) => ({ ...prev, discount: undefined }));
            }}
            placeholder="Enter discount amount"
            className={`border rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none w-full ${
              errors.discount ? "border-[#EE2A2A]" : "border-[#0000002E]"
            }`}
          />

          {/* Discount Method */}
          <div className="flex rounded-[8px] border border-[#E6EEF2] cursor-pointer">
            <div
              onClick={() => setFieldValue("method", "pct")}
              className={`p-2.5 pl-3 pr-3 rounded-tl-[7px] rounded-bl-[7px] ${
                values.method === "pct" ? "bg-[#E6EEF2]" : ""
              }`}
            >
              %
            </div>
            <div
              onClick={() => setFieldValue("method", "flat")}
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
            {errors.discount}
          </p>
        )}
      </label>
    </form>
  );
};

export default PriceInfo;
