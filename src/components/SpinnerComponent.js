import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export const SpinnerComponent = () => {
  let { loading } = useSelector((state) => state.spinnerSlice);
  return loading ? (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black z-50 flex justify-center items-center">
      <Spin />
    </div>
  ) : (
    <></>
  );
};
