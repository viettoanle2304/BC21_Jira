import React, { useEffect, useState } from "react";
import { projectService } from "../../services/project.service.js";
import { ProjectList } from "./ProjectList/ProjectList.js";

export const ProjectManagementPage = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    projectService
      .getAllProject()
      .then((res) => {
        // console.log(res);
        setProjectList(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(projectList);

  return (
    <>
      <ProjectList projectList={projectList} />
    </>
  );
};
