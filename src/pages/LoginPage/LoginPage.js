import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStoreService } from "../../services/localStore.service.js";
import { LoginForm } from "./LoginForm/LoginForm.js";
import { LoginTag } from "./LoginForm/LoginTag.js";

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStoreService.getUserLocal()) {
      navigate("/projectmanagement");
    }
  }, []);

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
                Log in to your account
              </p>

              <LoginForm />

              <p className="text-gray-500 text-xs my-4"> OR </p>

              <LoginTag brand="google" />
              <LoginTag brand="facebook" />
              <LoginTag brand="twitter" />

              <div className="w-full bg-gray-300 h-[1px] mt-10"></div>

              <div className="flex items-center justify-center p-3 space-x-2">
                <p className="m-0 text-blue-700 font-medium hover:underline hover:underline-offset-2 hover:text-blue-700 cursor-pointer">
                  Can't log in?
                </p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <a
                  href="/register"
                  className="m-0 text-blue-700 font-medium hover:underline hover:underline-offset-2 hover:text-blue-700 cursor-pointer"
                >
                  Sign up for an account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-center p-3 space-x-3">
          <p className="m-0 text-blue-700 text-xs font-medium hover:underline hover:underline-offset-2 hover:text-blue-800 cursor-pointer">
            Privacy Policy
          </p>
          <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
          <p className="m-0 text-blue-700 text-xs font-medium hover:underline hover:underline-offset-2 hover:text-blue-800 cursor-pointer">
            User Notice
          </p>
        </div>
      </div>
    </div>
  );
};
