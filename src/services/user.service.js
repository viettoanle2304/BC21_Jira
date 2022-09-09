import axios from "axios";
import { BASE_URL, httpService, TOKEN_CYBERSOFT } from "./url.config.js";

export const userServices = {
  login: ({ email, password }) => {
    return axios({
      url: BASE_URL + "/api/Users/signin",
      method: "POST",
      data: { email, password },
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  register: (dataRegister) => {
    return axios({
      url: BASE_URL + "/api/Users/signup",
      method: "POST",
      data: dataRegister,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  getUser: () => {
    return httpService.get(`/api/Users/getUser`);
  },
};
