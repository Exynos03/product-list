import { useState } from "react";
import toast from "react-hot-toast";

interface MonoInputModalProps {
  setShowModal: (show: boolean) => void; // Prop type for setShowModal
}

const MonoInputModal: React.FC<MonoInputModalProps> = ({ setShowModal }) => {
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSaveCategoryBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categoryName.trim().length < 1) {
      toast.error("Category name can't be empty!");
      return;
    }

    try {
      const catList = JSON.parse(
        localStorage.getItem("catList") ?? "[]",
      ) as string[];
      if (catList?.includes(categoryName)) {
        toast.error("Category name already exists!");
        return;
      }
      catList.push(categoryName.trim());
      localStorage.setItem("catList", JSON.stringify(catList));
      toast.success("Category added successfully!");
      setTimeout(() => {
        window.location.reload();
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.error("Error in creating category name =>", error);
      toast.error("An error occurred while saving the category.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-99 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-[12px] w-[85%] max-w-[495px] bg-white flex flex-col justify-start gap-4">
        <p className="font-['Work_Sans'] text-[24px] font-semibold leading-[28.15px] text-left">
          Add Category
        </p>
        <form
          className="flex flex-col gap-4 justify-start align-middle"
          onSubmit={handleSaveCategoryBtn}
        >
          <div>
            <p className="font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left">
              Category Name*
            </p>
            <input
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-[#0000002E] rounded-[8px] mt-[6px] outline-none font-['Work_Sans'] text-[16px] font-normal leading-[20px] text-left"
            />
          </div>
          <div className="w-full flex justify-end align-middle gap-4">
            <button
              type="button"
              className="p-2 pl-4 pr-4 bg-[#E1E7EB] rounded-[8px] font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-[#1F8CD0] cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={categoryName.trim().length < 1}
              style={categoryName.trim().length < 1 ? { opacity: "0.7" } : {}}
              className="p-2 pl-4 pr-4 bg-[#1F8CD0] rounded-[8px] font-['Work_Sans'] text-[16px] font-semibold leading-[18.77px] text-[#FFFFFF] cursor-pointer transition-[300ms]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MonoInputModal;
