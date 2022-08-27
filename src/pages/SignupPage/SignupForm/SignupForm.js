import { Button, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../../services/user.service.js";
import { LoadingOutlined } from "@ant-design/icons";

export const SignupForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
  );

  const onFinish = (values) => {
    // console.log(values);
    setLoading(true);
    console.log(values);
    userServices
      .register(values)
      .then((res) => {
        message.success("Đăng ký thành công");

        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.error(err);
        setLoading(false);
      });
  };

  const onFinishFailed = (errInfo) => {
    console.error("Failed: ", errInfo);
    setLoading(false);
  };

  return (
    <div className="">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-start items-center space-x-1">
                  <i className="text-xs fa-solid fa-triangle-exclamation"></i>
                  <span className="text-xs">Vui lòng nhập email</span>
                </div>
              ),
            },
          ]}
        >
          <Input
            placeholder="Enter an email"
            className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
            autoFocus
          />
        </Form.Item>

        <Form.Item
          name="passWord"
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-start items-center space-x-1">
                  <i className="text-xs fa-solid fa-triangle-exclamation"></i>
                  <span className="text-xs">Vui lòng nhập password</span>
                </div>
              ),
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-start items-center space-x-1">
                  <i className="text-xs fa-solid fa-triangle-exclamation"></i>
                  <span className="text-xs">Vui lòng nhập tên</span>
                </div>
              ),
            },
          ]}
        >
          <Input
            placeholder="Enter your name"
            className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: (
                <div className="flex justify-start items-center space-x-1">
                  <i className="text-xs fa-solid fa-triangle-exclamation"></i>
                  <span className="text-xs">Vui lòng nhập số điện thoại</span>
                </div>
              ),
            },
          ]}
        >
          <Input
            placeholder="Enter your phone number"
            className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-700 hover:bg-blue-500 py-2 h-full w-full font-bold "
            htmlType="submit"
          >
            {!loading ? "Sign up" : <Spin indicator={antIcon} />}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
