import { Avatar, Breadcrumb, Input, message } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectService } from "../../services/project.service";
import { TaskManagement } from "./TaskManagement/TaskManagement";

export const ProjectDetailPage = () => {
  let { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({});

  useEffect(() => {
    projectService
      .getProjectDetail(projectId)
      .then((res) => {
        // console.log(res.data.content);
        setProject(res.data.content);
      })
      .catch((err) => {
        message.error("Trang web không tồn tại");
        setTimeout(() => {
          navigate("/projectmanagement");
        }, 2000);
      });
  }, []);

  const handleSearch = (value) => {
    // console.log(value);
  };

  return (
    <div className="">
      <header>
        <Breadcrumb>
          <Breadcrumb.Item>Project</Breadcrumb.Item>
          <Breadcrumb.Item>CyberLearn</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/projectmanagement">Project management</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{project.projectName}</Breadcrumb.Item>
        </Breadcrumb>

        <h1>{project.projectName}</h1>
        <p>{project.description?.replaceAll(/<[/A-z]+>/g, "")}</p>
      </header>

      <div className="flex items-center space-x-4">
        <Input.Search style={{ width: "250px" }} onSearch={handleSearch} />

        <div className=" space-x-1">
          {project.members?.map((member, i) => {
            return (
              <Avatar className="cursor-pointer" key={i} src={member.avatar} />
            );
          })}
        </div>

        <p className="m-0 cursor-pointer hover:text-gray-400">Only My Issues</p>

        <p className="m-0 cursor-pointer hover:text-gray-400">
          Recently Updated
        </p>
      </div>

      <div className="grid grid-cols-4 gap-1 xl:mt-14 auto-cols-max auto-rows-max">
        <TaskManagement headerName="BACKLOG" projectId={project.id} />
        <TaskManagement
          headerName="SELECTED FOR DEVELOPMENT"
          projectId={project.id}
        />
        <TaskManagement headerName="IN PROGRESS" projectId={project.id} />
        <TaskManagement headerName="DONE" projecId={project.id} />
      </div>
    </div>
  );
};
