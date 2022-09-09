import { Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllProjectInfoActionService } from "../../redux/actions/project.action";
import { projectService } from "../../services/project.service";

export const DeleteProjectButton = ({ project }) => {
  const dispatch = useDispatch();

  return (
    <Button
      className="bg-red-600 border-red-600 text-white rounded-full w-10 h-10 flex justify-center items-center hover:bg-white hover:text-red-600 hover:border-red-600 focus:bg-white focus:text-red-600 focus:border-red-600"
      onClick={() => {
        console.log(project.id);
        projectService
          .deleteProject(project.id)
          .then((res) => {
            message.success("Xoá dự án thành công");
            // console.log(res);
            dispatch(getAllProjectInfoActionService());
          })
          .catch((err) => {
            message.error("Xoá dự án thất bại");
            console.error(err);
          });
      }}
    >
      <i className="fa-solid fa-trash"></i>
    </Button>
  );
};
