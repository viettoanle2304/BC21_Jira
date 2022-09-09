import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { getAllProjectInfoActionService } from "../../../redux/actions/project.action";
import { projectService } from "../../../services/project.service";

export const EditProjectModal = ({ project }) => {
  // console.log(project);
  const [updatedProjectInfo, setUpdatedProjectInfo] = useState({
    id: project.id,
    projectName: project.projectName,
    creator: project.creator.id,
    description: project.description,
    categoryId: project.categoryId,
  });

  const [_updateTracking, setUpdateTracking] = useState(false);
  const dispatch = useDispatch();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      setUpdatedProjectInfo({
        ...updatedProjectInfo,
        description: editorRef.current.getContent(),
      });
    }
  };

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    // console.log(e);
    log();
    setVisible(false);
    setUpdateTracking(true);
  };

  const handleCancel = (e) => {
    // console.log(e);
    setVisible(false);
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  useEffect(() => {
    if (_updateTracking) {
      projectService
        .updateProject(updatedProjectInfo)
        .then((res) => {
          // console.log(res.status);
          message.success("Thông tin dự án đã được cập nhật thành công");
          dispatch(getAllProjectInfoActionService());
        })
        .catch((err) => {
          console.error(err);
          message.error(err.response.data?.content);
        });

      setUpdateTracking(false);
    }
  }, [_updateTracking, updatedProjectInfo]);

  return (
    <>
      <Button
        className="bg-green-600 border-green-600 text-white w-10 h-10 rounded-full flex justify-center items-center hover:bg-white hover:text-green-600 hover:border-green-600 focus:bg-white focus:text-green-600 focus:border-green-600"
        onClick={showModal}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>

      {visible && (
        <Modal
          title={
            <div
              style={{
                width: "100%",
                cursor: "move",
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
              onFocus={() => {}}
              onBlur={() => {}} // end
            >
              Edit Project
            </div>
          }
          visible={true}
          onCancel={handleCancel}
          maskClosable={false}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <div className="">
            <Form className="grid grid-cols-3 gap-5" layout="vertical">
              <Form.Item
                className=""
                label={<span className="font-bold">Project id</span>}
              >
                <Input
                  className="disabled:cursor-default placeholder:text-black"
                  placeholder={updatedProjectInfo.id}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold">Project name</span>}
              >
                <Input
                  className="disabled:cursor-default placeholder:text-black"
                  value={updatedProjectInfo.projectName}
                  onChange={(e) =>
                    setUpdatedProjectInfo({
                      ...updatedProjectInfo,
                      projectName: e.target.value,
                    })
                  }
                  autoFocus
                />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold">Project Category</span>}
              >
                <Select
                  defaultValue={updatedProjectInfo.categoryId}
                  onChange={(value) =>
                    setUpdatedProjectInfo({
                      ...updatedProjectInfo,
                      categoryId: value,
                    })
                  }
                >
                  <Select.Option value="1">Dự án web</Select.Option>
                  <Select.Option value="2">Dự án phần mềm</Select.Option>
                  <Select.Option value="3">Dự án di động</Select.Option>
                </Select>
              </Form.Item>
            </Form>
            <p className="font-bold">Description</p>

            <div className="text-editor">
              <Editor
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                initialValue={`<span>${updatedProjectInfo.description}</span>`}
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
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
