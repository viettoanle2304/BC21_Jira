import { Button, Form, Input, message, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfoActionService } from "../../../redux/actions/user.action";
import { LoadingOutlined } from "@ant-design/icons";

export const LoginForm = () => {
  const [_inputDisabled, setInputDisabled] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
  );

  const emailRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_inputDisabled) {
      emailRef.current.focus();
    } else {
      emailRef.current.blur();
    }
  }, [_inputDisabled]);

  useEffect(() => {
    // console.log(userData);
    if (loading) {
      let onSuccess = () => {
        message.success("Đăng nhập thành công");

        setTimeout(() => {
          setLoading(false);
          navigate("/projectmanagement");
        }, 3000);
      };

      let onFail = (errInfo) => {
        message.error(errInfo);
        setLoading(false);
      };

      dispatch(setUserInfoActionService(userData, onSuccess, onFail));
    }
  }, [loading, userData, navigate, dispatch]);

  const onFinish1 = (value) => {
    // console.log(value);
    setUserData({ ...userData, email: value.email });
    setInputDisabled(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const onFinish2 = (value) => {
    setUserData({ ...userData, password: value.password });
    setLoading(true);
  };

  return (
    <div className="">
      <Form
        name="basic1"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish1}
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
          <div className="">
            <Input
              placeholder="Enter an email"
              className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
              ref={emailRef}
            />

            {_inputDisabled && (
              <div
                className="w-full h-full absolute bottom-0 left-0 cursor-pointer"
                onClick={() => {
                  setInputDisabled(false);
                }}
              >
                <div className=" bg-gray-400 w-full h-full opacity-25  "></div>

                <div className="w-full h-full flex justify-end items-center px-2 absolute right-0 bottom-0">
                  <i className="fa-solid fa-pen text-gray-500 hover:text-black"></i>
                </div>
              </div>
            )}
          </div>
        </Form.Item>

        {!_inputDisabled && (
          <Form.Item className="m-0">
            <Button
              type="primary"
              className="bg-blue-700 hover:bg-blue-500 py-2 h-full w-full font-bold"
              htmlType="submit"
            >
              Continue
            </Button>
          </Form.Item>
        )}
      </Form>

      {_inputDisabled && (
        <Form
          name="basic2"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish2}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="animate__animated animate__fadeInDown animate__faster"
            name="password"
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
              autoFocus
            />
          </Form.Item>

          <Form.Item className="m-0 animate__animated animate__fadeIn">
            <Button
              type="primary"
              className={`bg-blue-700 hover:bg-blue-500 py-2 h-full w-full font-bold `}
              htmlType="submit"
            >
              {!loading ? "Log in" : <Spin indicator={antIcon} />}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
    // <Form
    //   className="mt-6"
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <div className=" space-y-4">
    //     <Form.Item
    //       className=" relative p-0"
    //       name="email"
    //       rules={[
    //         {
    //           required: true,
    //           message: (
    //             <div className="flex justify-start items-center space-x-1">
    //               <i className="text-xs fa-solid fa-triangle-exclamation"></i>
    //               <span className="text-xs">Vui lòng nhập email</span>
    //             </div>
    //           ),
    //         },
    //       ]}
    //     >
    //       <Input
    //         placeholder="Enter email"
    //         className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
    //         ref={emailRef}
    //         onChange={(e) => {
    //           setUserEmail({ ...userEmail, email: e.target.value });
    //         }}
    //       />

    //       {_inputDisabled && (
    //         <div
    //           className="w-full h-full absolute bottom-0 left-0 cursor-pointer"
    //           onClick={() => {
    //             setInputDisabled(false);
    //           }}
    //         >
    //           <div className=" bg-gray-400 w-full h-full opacity-25  "></div>

    //           <div className="w-full h-full flex justify-end items-center px-2 absolute right-0 bottom-0">
    //             <i className="fa-solid fa-pen text-gray-500 hover:text-black"></i>
    //           </div>
    //         </div>
    //       )}
    //     </Form.Item>

    //     {_inputDisabled && (
    //       <Form.Item
    //         className="p-0 animate__animated animate__fadeIn"
    //         name="passWord"
    //         rules={[
    //           {
    //             required: true,
    //             message: (
    //               <div className="flex justify-start items-center space-x-1">
    //                 <i className="text-xs fa-solid fa-triangle-exclamation"></i>
    //                 <span className="text-xs">Vui lòng nhập password</span>
    //               </div>
    //             ),
    //           },
    //         ]}
    //       >
    //         <Input.Password
    //           placeholder="Enter your password"
    //           className="border-2 border-gray-300 px-2 py-[6px] rounded bg-gray-50 placeholder-gray-500 disabled:cursor-pointer"
    //           autoFocus
    //           onChange={(e) =>
    //             setUserEmail({ ...userEmail, password: e.target.value })
    //           }
    //         />
    //       </Form.Item>
    //     )}

    //     <Form.Item>
    //       {!_inputDisabled && (
    //         <Button
    //           type="primary"
    //           className="bg-blue-700 hover:bg-blue-500 py-2 h-full w-full font-bold "
    //           onClick={() => {
    //             setInputDisabled(true);
    //           }}
    //         >
    //           Continue
    //         </Button>
    //       )}

    //       {_inputDisabled && (
    //         <Button
    //           type="primary"
    //           className="bg-blue-700 hover:bg-blue-500 py-2 h-full w-full font-bold "
    //           htmlType="submit"
    //         >
    //           Submit
    //         </Button>
    //       )}
    //     </Form.Item>
    //   </div>
    // </Form>
  );
};
