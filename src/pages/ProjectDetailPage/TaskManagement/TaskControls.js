import { Popover } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export const TaskControls = () => {
  const [hovered, setHovered] = useState(false);

  const handleClickChange = () => {
    setHovered(false);
  };

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };

  const content = (
    <div className="space-y-2">
      <div
        className="space-x-2 cursor-pointer hover:text-gray-400"
        onClick={handleClickChange}
      >
        <SettingOutlined />
        <span>Update Task</span>
      </div>
      <div
        className="space-x-2 cursor-pointer hover:text-gray-400"
        onClick={handleClickChange}
      >
        <InfoCircleOutlined />
        <span>Task Detail</span>
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
