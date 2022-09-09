import { Modal } from "antd";
import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

export const TaskDetailModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div>
      <div
        className="space-x-2 cursor-pointer hover:text-gray-400"
        onClick={showModal}
      >
        <InfoCircleOutlined />
        <span>Task Detail</span>
      </div>
      <Modal
        title="Task Detail"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
