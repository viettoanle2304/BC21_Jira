import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { tableProject } from "../../../utils/ProjectManagement.utils.js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectInfoActionService } from "../../../redux/actions/project.action.js";

export const ProjectList = () => {
  const { projects } = useSelector((state) => state.projectSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectInfoActionService());
  }, []);

  return (
    <Table
      dataSource={projects}
      columns={tableProject}
      rowKey={() => uuidv4()}
      showSorterTooltip={false}
    />
  );
};
