import React from "react";

export const SignupTag = ({ brand = "" }) => {
  return (
    <div
      className="grid grid-cols-4 justify-items-start py-[10px] cursor-pointer hover:bg-gray-50 rounded mb-[18px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="text-base col-span-1 self-center px-3">
        <img
          className="h-4 w-4"
          src={require(`../../../assets/images/${brand}-logo.png`)}
          alt=""
        />
      </div>
      <div className="col-span-3 text-[15px] font-bold self-center px-2 h-full ">
        <p className="m-0">
          Continue with {brand.slice(0, 1).toUpperCase() + brand.slice(1)}
        </p>
      </div>
    </div>
  );
};
