import { useState } from "react";

const ProductList = () => {
  const catList = localStorage.getItem("catList");
  const parsedCatList: string[] = catList ? JSON.parse(catList) : [];
  const [categoryList, setCategoryList] = useState(parsedCatList || []);
  const [productList, setProductList] = useState([
    {
      productName: "Nike Air Force",
      productImg:
        "https://coreldrawdesign.com/resources/thumbnails/thumbnail-1716884599.jpg",
      companyName: "Nike",
      price: "12000",
      categoryName: "Shoes",
    },
    {
      productName: "Nike Air Force",
      productImg:
        "https://coreldrawdesign.com/resources/thumbnails/thumbnail-1716884599.jpg",
      companyName: "Nike",
      price: "12000",
      categoryName: "Shoes",
    },
    {
      productName: "Nike Air Force",
      productImg:
        "https://coreldrawdesign.com/resources/thumbnails/thumbnail-1716884599.jpg",
      companyName: "Nike",
      price: "12000",
      categoryName: "Shoes",
    },
  ]);

  return (
    <main className="flex h-[90%] gap-6 p-6 pt-0 justify-start align-middle overflow-x-auto scrolling-touch scrollbar-thin">
      <div className="flex gap-6 whitespace-nowrap">
        {categoryList?.map((category: string, index: number) => {
          return (
            <div
              className="flex flex-col justify-start align-middle gap-2 w-[320px] bg-[#F8F8F8] rounded-[10px] p-4 overflow-auto scrollbar-thin"
              key={index}
            >
              <p className="flex flex-col gap-6 font-['Work_Sans'] text-[16px] font-medium leading-[18.77px] text-left mb-[5px]">
                {category}
              </p>
              {productList?.map((product, index) => {
                if (category !== product.categoryName) return;
                return (
                  <div
                    key={index}
                    className="bg-[#FFFFFF] rounded-[10px] shadow-[0px_0px_10px_-2px_#0000001A] p-2 flex gap-4"
                  >
                    <img
                      className="rounded-[8px] w-[84px] h-[84px]"
                      src={product.productImg}
                      alt="Product photo"
                    />
                    <div>
                      <p className="font-['Work_Sans'] text-[16px] font-medium leading-[18.77px] text-left">
                        {product.productName}
                      </p>
                      <p className="font-['Work_Sans'] text-[14px] font-normal leading-[16.42px] text-left mt-[4px]">
                        ₹{product.price}
                      </p>
                      <div className="flex justify-center align-middle mt-[8px] rounded-[6px] bg-[#ECF7FF] font-['Work_Sans'] text-[12px] font-medium leading-[14.08px] text-[#1F8CD0] p-1 w-1/2">
                        {product.companyName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProductList;
