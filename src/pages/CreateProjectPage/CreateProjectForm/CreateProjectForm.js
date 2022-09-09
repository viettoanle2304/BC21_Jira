import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, message, Select } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../../../services/project.service";

export const CreateProjectForm = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // const category = formRef.current.form.getFieldValue("category");
    values.description = editorRef.current?.getContent();
    values.alias = values.projectName.replaceAll(/\s+/g, "-").toLowerCase();
    console.log("Success:", values);

    projectService
      .createProject(values)
      .then((res) => {
        message.success("Dự án mới được khởi tạo thành công");

        setTimeout(() => {
          navigate("/projectmanagement");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data.content);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
        categoryId: "1",
        description: "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Name"
        name="projectName"
        rules={[
          {
            required: true,
            message: "Nhập tên dự án khởi tạo",
          },
        ]}
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Form.Item>

      <Form.Item name="categoryId">
        <Select>
          <Select.Option value="1">Dự án web</Select.Option>
          <Select.Option value="2">Dự án phần mềm</Select.Option>
          <Select.Option value="3">Dự án di động</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create project
        </Button>
      </Form.Item>
    </Form>
  );
};
