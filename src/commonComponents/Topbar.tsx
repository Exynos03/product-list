import React from "react";

type TopbarProps = Partial<{
  heading: string;
  btn1Text: string;
  btn2Text: string;
  btn1Navigation: () => void;
  btn2Navigation: () => void;
}>;

const Topbar: React.FC<TopbarProps> = ({
  heading,
  btn1Text,
  btn2Text,
  btn1Navigation,
  btn2Navigation,
}) => {
  return (
    <nav className="flex justify-between items-center p-6 ">
      <h1 className="font-['Work_Sans'] text-[24px] font-semibold leading-[28.15px] text-left">
        {heading}
      </h1>
      {(btn1Text || btn2Text) && (
        <div className="flex gap-4 justify-end items-center w-4/12">
          <button
            className="bg-[#E1E7EB] w-1/2 rounded-[8px] p-2 pl-4 pr-4 font-['Work_Sans'] text-[16px] font-semibold leading-[24px] text-[#1F8CD0] cursor-pointer"
            onClick={btn1Navigation}
          >
            {btn1Text}
          </button>
          <button
            type="submit"
            className="bg-[#1F8CD0] w-1/2 rounded-[8px] p-2 pl-4 pr-4 font-['Work_Sans'] text-[16px] font-semibold leading-[24px] text-[#FFFFFF] cursor-pointer"
            onClick={btn2Navigation}
          >
            {btn2Text}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
