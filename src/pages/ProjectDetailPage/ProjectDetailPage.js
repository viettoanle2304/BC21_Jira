import { message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectService } from "../../services/project.service";

export const ProjectDetailPage = () => {
  let { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    projectService
      .getProjectDetail(projectId)
      .then((res) => {})
      .catch((err) => {
        message.error("Trang web không tồn tại");
        setTimeout(() => {
          navigate("/projectmanagement");
        }, 2000);
      });
  }, []);

  return <div>ProjectDetailPage</div>;
};
