import { useLocation } from "react-router-dom";
import Sidebar from "./commonComponents/Sidebar";
import Topbar from "./commonComponents/Topbar";

const Dummy = () => {
  const location = useLocation();

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col justify-start align-middle w-4/5 cr:w-4/6 h-screen">
        <Topbar heading={location.pathname.slice(1)} />
        <div className="w-full h-screen flex justify-center items-center">
          <h1>
            Page not found, as assigment is about product page. Go to Products
            page
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
