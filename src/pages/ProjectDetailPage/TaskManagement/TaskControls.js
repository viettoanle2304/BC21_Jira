import { Popover } from "antd";
import React, { useState } from "react";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { TaskDetailModal } from "./TaskDetailModal";
import { DeleteTask } from "./DeleteTask";

export const TaskControls = ({ taskId }) => {
  const [hovered, setHovered] = useState(false);

  const handleClickChange = () => {
    setHovered(false);
  };

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };

  const content = (
    <div className="space-y-2">
      <div onClick={handleClickChange}>
        <UpdateTaskModal taskId={taskId} />
      </div>

      <div onClick={handleClickChange}>
        <TaskDetailModal />
      </div>

      <div onClick={handleClickChange}>
        <DeleteTask taskId={taskId} />
      </div>
    </div>
  );

  return (
    <>
      <Popover
        showArrow={false}
        placement="bottomRight"
        content={content}
        trigger="click"
        visible={hovered}
        onVisibleChange={handleHoverChange}
        onClick={handleClickChange}
      >
        <div className="mr-2 hover:text-gray-400 cursor-pointer">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </Popover>
    </>
  );
};
