import { projectService } from "../../services/project.service";
import { GET_ALL_PROJECT_INFO } from "../constants/project.constant";

export const getAllProjectInfoActionService = () => {
  return (dispatch) => {
    projectService
      .getAllProject()
      .then((res) => {
        dispatch({
          type: GET_ALL_PROJECT_INFO,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
