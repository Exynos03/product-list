import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dummy from "./Fallback";
import { useEffect } from "react";
import Product from "./pages/products/container/Product";
import { Toaster } from "react-hot-toast";
import AddProducts from "./pages/addProduct/containers/AddProducts";

function App() {
  useEffect(() => {
    if (localStorage.getItem("catList")) return;
    else localStorage.setItem("catList", JSON.stringify(["Shoes", "Tshirt"]));
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Products" />} />
          <Route path="/Products" element={<Product />} />
          <Route path="/Products/add-product" element={<AddProducts />} />
          <Route path="*" element={<Dummy />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
