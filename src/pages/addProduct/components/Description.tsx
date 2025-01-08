import React from "react";
import { LuImageUp } from "react-icons/lu";
import { useFormContext } from "react-hook-form";

const Description: React.FC = () => {
  const options: string[] = JSON.parse(localStorage.getItem("catList") ?? "[]");
    const {
      register,
      setValue,
      setError,
      watch,
      formState: { errors },
    } = useFormContext();
  const formData = watch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setValue("image", file); 
      setError("image", null)
    }
  };

  const imageName = formData.image ? formData.image.name : null;

  return (
    <form
      className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-4 justify-start align-middle"
    >
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left">
        Description
      </p>

      {/* Product Name */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Product name*
        <input
          {...register("product_name")}
          placeholder="Enter product name"
          className="border border-[#0000002E] rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none"
          style={errors.product_name ? { borderColor: "#EE2A2A" } : {}}
        />
        {errors.product_name && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {errors.product_name?.message}
          </p>
        )}
      </label>

      {/* Category */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Category*
        <div className="relative">
          <select
            {...register("category")}
            className="appearance-none border border-[#0000002E] p-2.5 rounded-[8px] w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] bg-white outline-none"
            style={errors.category ? { borderColor: "#EE2A2A" } : {}}
          >
            <option value="" disabled>
              Select a category
            </option>
            {options.map((option, idx) => (
              <option key={idx} value={option} className="font-['Work_Sans'] cursor-pointer">
                {option}
              </option>
            ))}
          </select>
          <svg
            className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {errors.category && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {errors.category?.message}
          </p>
        )}
      </label>

      {/* Brand Name */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Brand name*
        <input
          {...register("brand_name")}
          placeholder="Enter brand name"
          className="border border-[#0000002E] rounded-[8px] p-2.5 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none"
          style={errors.brand_name ? { borderColor: "#EE2A2A" } : {}}
        />
        {errors.brand_name && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {errors.brand_name?.message}
          </p>
        )}
      </label>

      {/* Image Upload */}
      <div className="flex flex-col gap-1 justify-start">
        <div
          onClick={() => document.getElementById("img_upd")?.click()}
          style={errors.image?.message ? { borderColor: "#EE2A2A" } : {}}
          className="flex justify-center align-middle gap-2 border border-[#1F8CD0] rounded-[8px] mr-auto p-2 cursor-pointer"
        >
          <LuImageUp color="#1F8CD0" size={20} />
          <p className="text-[#1F8CD0] font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px]">
            {imageName ? imageName : "Upload Image"}
          </p>
        </div>
        {errors.image && (
          <p className="font-['Work_Sans'] text-[#EE2A2A] text-[12px] font-normal leading-[16.42px] text-left">
            {errors.image?.message}
          </p>
        )}
      </div>

      <input
        name="img_upd"
        type="file"
        accept="image/*"
        className="hidden"
        id="img_upd"
        onChange={handleImageUpload} 
      />
    </form>
  );
};

export default Description;
