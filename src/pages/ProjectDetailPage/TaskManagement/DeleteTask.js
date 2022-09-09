import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { taskService } from "../../../services/task.service";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTaskListActionService } from "../../../redux/actions/task.action";

export const DeleteTask = ({ taskId }) => {
  const { task } = useSelector((state) => state.taskSlice);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    taskService
      .removeTask(taskId)
      .then((res) => {
        message.success("Xoá task thành công");
        dispatch(getTaskListActionService(task.taskInfo?.projectId));
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data.content || "Xoá task không thành công");
      });
  };

  return (
    <div
      className="space-x-2 cursor-pointer hover:text-gray-400"
      onClick={handleDeleteTask}
    >
      <DeleteOutlined />
      <span>Delete Task</span>
    </div>
  );
};
