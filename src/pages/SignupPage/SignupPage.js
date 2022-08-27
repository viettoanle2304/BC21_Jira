import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStoreService } from "../../services/localStore.service.js";
import { SignupForm } from "./SignupForm/SignupForm.js";
import { SignupTag } from "./SignupForm/SignupTag.js";

export const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStoreService.getUserLocal()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto pt-10">
      <header className="flex justify-center space-x-3">
        <div className="text-center text-3xl text-blue-600">
          <i className="fa-brands fa-atlassian"></i>
        </div>
        <h1 className="text-4xl text-center text-blue-800 font-extrabold tracking-wider uppercase">
          Atlassian
        </h1>
      </header>

      <div className=" mt-4">
        <div className="flex justify-center">
          <div
            className="bg-white w-[400px] px-10 py-6 text-center"
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <div className="">
              <p className="font-bold text-gray-500 text-base">
                Sign up for your account
              </p>

              <SignupForm />

              <p className="text-gray-500 text-xs my-4"> OR </p>

              <SignupTag brand="google" />
              <SignupTag brand="facebook" />
              <SignupTag brand="twitter" />

              <div className="w-full bg-gray-300 h-[1px] mt-10"></div>

              <div className="flex items-center justify-center p-3 space-x-2">
                <a
                  href="/login"
                  className="m-0 text-blue-700 font-medium hover:underline hover:underline-offset-2 hover:text-blue-700 cursor-pointer"
                >
                  Already have an account? Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-center p-3 space-x-3">
          <p className="m-0 text-gray-600 text-xs font-medium text-center w-[400px]">
            This page is protected by reCAPTCHA and the Google
            <span className="text-blue-700 hover:text-blue-800 hover:underline hover:underline-offset-2 cursor-pointer">
              {" Privacy Policy"}
            </span>
            {" and "}
            <span className="text-blue-700 hover:text-blue-800 hover:underline hover:underline-offset-2 cursor-pointer">
              Terms of Service
            </span>
            apply
          </p>
        </div>
      </div>
    </div>
  );
};
