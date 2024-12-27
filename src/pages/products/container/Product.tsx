import { useState } from "react";
import Sidebar from "../../../commonComponents/Sidebar";
import Topbar from "../../../commonComponents/Topbar";
import MonoInputModal from "../../../Modals/MonoInputModal";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

const Dummy = () => {
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex w-full">
      {showCategoryModal && (
        <MonoInputModal setShowModal={setShowCategoryModal} />
      )}
      <Sidebar />
      <div className="flex flex-col justify-start align-middle w-4/5 cr:w-4/6 h-screen">
        <Topbar
          heading="Product"
          btn1Text="Add Category"
          btn2Text="Add Product"
          btn1Navigation={() => setShowCategoryModal(true)}
          btn2Navigation={() => navigate("/Products/add-product")}
        />
        <ProductList />
      </div>
    </div>
  );
};

export default Dummy;
