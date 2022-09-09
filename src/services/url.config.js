import axios from "axios";
import {
  setSpinnerEnded,
  setSpinnerStarted,
} from "../redux/reducers/spinnerSlice";
import { store } from "../redux/store";
import { USER } from "./localStore.service";

export const BASE_URL = "https://jiranew.cybersoft.edu.vn/";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMSIsIkhldEhhblN0cmluZyI6IjA1LzEyLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY3MDE5ODQwMDAwMCIsIm5iZiI6MTY0MTkyMDQwMCwiZXhwIjoxNjcwMzQ2MDAwfQ.kdBVHpDWKZ-X7NZhWx-Y-ILozaT3RsvaQQF-Yqk4uV4";

let timeRequestMax = 10;

export const getAccessToken = () => {
  const dataJSON = localStorage.getItem(USER);
  if (dataJSON) {
    const data = JSON.parse(dataJSON);
    return data.accessToken;
  } else return null;
};

export const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * timeRequestMax,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + getAccessToken(),
  },
});

httpService.interceptors.request.use(
  function (config) {
    store.dispatch(setSpinnerStarted());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  function (response) {
    // console.log("yes response");
    store.dispatch(setSpinnerEnded());
    return response;
  },
  function (error) {
    store.dispatch(setSpinnerEnded());

    switch (error.response?.status) {
      case 401:
      case 403:
        window.location.href = "/login";
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
