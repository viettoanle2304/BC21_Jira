import { Avatar, Modal } from "antd";
import React, { useState } from "react";

export const AddUserModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Avatar
        className="flex justify-center items-center bg-[#fde3cf] hover:bg-white hover:border-2 hover:border-[#fde3cf]"
        style={{
          color: "#f6822a",
        }}
        onClick={showModal}
      >
        +
      </Avatar>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
