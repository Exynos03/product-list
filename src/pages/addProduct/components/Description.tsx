import React, { useState } from "react";
import { LuImageUp } from "react-icons/lu";

const Description = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options = JSON.parse(localStorage.getItem('catList') ?? '[]') as string[]

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleImageUpload = (event: React.ChangeEvent<{ value: unknown }>) => {

  }

  return (
    <form className="w-full border mt-6 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] p-5 rounded-[12px] flex flex-col gap-4 justify-start align-middle">
      <p className="font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-left">Description</p>
      
      {/* Product Name */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Product name*
        <input 
          placeholder="Enter product name"
          className="border border-[#0000002E] rounded-[8px] p-2 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {/* Category */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Category*
        <div className="relative">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="appearance-none border border-[#0000002E] p-2 rounded-[8px]  w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] bg-white outline-none "
          >
            <option  value="" disabled>
              <span className="text-gray-500 font-['Work_Sans']">Select a category</span>
            </option >
            {options.map((option, idx) => (
              <option  key={idx} value={option} className="font-['Work_Sans'] cursor-pointer">
                {option}
              </option >
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
      </label>

      {/* Brand Name */}
      <label className="flex flex-col gap-1 w-full font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
        Brand name*
        <input 
          placeholder="Enter brand name"
          className="border border-[#0000002E] rounded-[8px] p-2 font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <div onClick={() => document.getElementById("img_upd")?.click()} className="flex justify-center align-middle gap-2 border border-[#1F8CD0] rounded-[8px] mr-auto p-2 cursor-pointer">
        <LuImageUp color="#1F8CD0" size={20}/>
        <p className="text-[#1F8CD0] font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px]">Upload Image</p>
      </div>

      <input 
        type="file"
        className="hidden"
        id="img_upd"
        onChange={handleImageUpload}
      />
    </form>
  );
};

export default Description;
