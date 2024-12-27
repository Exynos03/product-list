import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = [
    "Home",
    "Stores",
    "Products",
    "Catalogue",
    "Promotions",
    "Reports",
    "Docs",
    "Settings",
  ];

  return (
    <section className="w-1/5 cr:w-1/6 p-6 flex flex-col gap-6 border-r border-[#00000014] min-h-screen">
      <img
        className="w-[116px] cursor-pointer"
        onClick={() => navigate("/")}
        src="/lemon inc.webp"
        alt="Lemon Inc"
      />
      <hr />
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(`/${option}`)}
              className="flex flex-row gap-2 justify-start align-middle p-3 pl-4 hover:bg-blue-100 cursor-pointer transition-[300ms] rounded-[8px]"
              style={
                location?.pathname?.includes(option)
                  ? { backgroundColor: "#ECF7FF" }
                  : {}
              }
            >
              <div className="w-[20px] h-[20px] bg-[#F5F5F5] border-[#0000001A]"></div>
              <p
                className="font-['Work_Sans'] text-[14px] font-normal leading-[20px] text-black"
                style={
                  location?.pathname?.includes(option)
                    ? { color: "#1F8CD0", fontWeight: "500" }
                    : {}
                }
              >
                {option}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="mt-auto" />
      <div className="flex gap-2 justify-start align-middle">
        <img
          className="w-[48px] rounded-full"
          src="/avatar.webp"
          alt="Avatar"
        />
        <div className="flex flex-col justify-center align-middle gap-0">
          <p className="font-['Work_Sans'] text-[14px] font-normal leading-[20px] text-black">
            Sumit Ghosh
          </p>
          <p className="font-['Work_Sans'] text-[14px] font-normal leading-[20px] text-[#8C8C8C]">
            sumit.ghosh@gmail.com
          </p>
        </div>
        <IoIosArrowForward
          color="#1F8CD0"
          size={20}
          className="ml-auto mt-auto mb-auto"
        />
      </div>
    </section>
  );
};

export default Sidebar;
