import { Table } from "antd";
import React from "react";
import { tableProject } from "../../../utils/ProjectManagement.utils.js";
import { v4 as uuidv4 } from "uuid";

export const ProjectList = ({ projectList }) => {
  return (
    <Table
      dataSource={projectList}
      columns={tableProject}
      rowKey={() => uuidv4()}
    />
  );
};
