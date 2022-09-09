import axios from "axios";
import {
  BASE_URL,
  getAccessToken,
  httpService,
  TOKEN_CYBERSOFT,
} from "./url.config";

export const taskService = {
  getAllStatus: () => {
    return httpService.get("/api/Status/getAll");
  },

  getAllPriority: () => {
    return httpService.get("/api/Priority/getAll");
  },

  getAllTaskType: () => {
    return httpService.get("/api/TaskType/getAll");
  },

  createTask: (data) => {
    return axios({
      url: BASE_URL + "/api/Project/createTask",
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  getTaskDetail: (taskId) => {
    return httpService.get(`/api/Project/getTaskDetail?taskId=${taskId}`);
  },

  updateTask: (data) => {
    return axios({
      url: BASE_URL + "/api/Project/updateTask",
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  removeTask: (taskId) => {
    return httpService.delete(`/api/Project/removeTask?taskId=${taskId}`);
  },
};
