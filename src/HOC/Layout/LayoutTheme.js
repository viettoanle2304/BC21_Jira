import React from "react";
import { SecureView } from "../SecureView.js";

export const LayoutTheme = ({ Component }) => {
  return (
    <SecureView>
      <div className="flex flex-col justify-between">
        <div className="container mx-auto py-10">
          <Component />
        </div>
      </div>
    </SecureView>
  );
};
