import { httpService } from "./url.config.js";

export const projectService = {
  getAllProject: () => {
    return httpService.get("/api/Project/getAllProject");
  },
};
