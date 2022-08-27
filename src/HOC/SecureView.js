import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER } from "../services/localStore.service.js";

export const SecureView = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem(USER));
    // console.log(userLocal.accessToken);

    if (!userLocal.accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};
