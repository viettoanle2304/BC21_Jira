import axios from "axios";
import {
  BASE_URL,
  getAccessToken,
  httpService,
  TOKEN_CYBERSOFT,
} from "./url.config.js";

export const projectService = {
  getAllProject: () => {
    return httpService.get("/api/Project/getAllProject");
  },

  updateProject: (updateProject) => {
    console.log(updateProject);
    return axios({
      url:
        BASE_URL + `/api/Project/updateProject?projectId=${updateProject.id}`,
      method: "PUT",
      data: updateProject,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  deleteProject: (projectId) => {
    return httpService.delete(
      `/api/Project/deleteProject?projectId=${projectId}`
    );
  },

  deleteMember: (data) => {
    return axios({
      url: BASE_URL + "/api/Project/removeUserFromProject",
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  getUserByProjectId: (id) => {
    return httpService.get(`/api/Users/getUserByProjectId?idProject=${id}`);
  },

  getProjectDetail: (projectId) => {
    return httpService.get(`/api/Project/getProjectDetail?id=${projectId}`);
  },

  assignUserProject: (data) => {
    return axios({
      url: BASE_URL + "/api/Project/assignUserProject",
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
      },
    });
  },

  createProject: (data) => {
    return axios({
      url: BASE_URL + "/api/Project/createProjectAuthorize",
      method: "POST",
      data: data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + getAccessToken(),
        "Content-Type": "application/json",
      },
    });
  },
};
