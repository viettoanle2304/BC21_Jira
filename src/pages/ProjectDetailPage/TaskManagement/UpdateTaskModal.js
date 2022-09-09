import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Slider,
  Space,
} from "antd";
import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskInfoActionService,
  getTaskListActionService,
} from "../../../redux/actions/task.action";
import { taskService } from "../../../services/task.service";
import { localStoreService } from "../../../services/localStore.service";
import { projectService } from "../../../services/project.service";

export const UpdateTaskModal = ({ taskId }) => {
  const editorRef = useRef(null);
  const assigneesRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const { task } = useSelector((state) => state.taskSlice);
  const dispatch = useDispatch();

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const [assignessState, setAssignesssState] = useState([]);

  useEffect(() => {
    dispatch(getTaskInfoActionService(taskId)).then((res) => {
      // console.log(res);
      setTimeTracking({
        timeTrackingSpent: res.taskInfo.timeTrackingSpent,
        timeTrackingRemaining: res.taskInfo.timeTrackingRemaining,
      });

      setAssignesssState(
        [...res.assigneesList].filter(
          (val) => !res.currenAssigness.find((v) => v.key === val.key)
        )
      );
    });
  }, [visible]);

  // useEffect(() => {
  //   console.log(assignessState);
  // }, [assignessState]);

  const marks = {
    0: (
      <span className="font-bold left-0 top-2 absolute whitespace-nowrap">
        {timeTracking.timeTrackingSpent}h logged
      </span>
    ),
    [timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining > 0
      ? timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining
      : 100]: (
      <span className="font-bold right-0 top-2 text-black absolute whitespace-nowrap">
        {timeTracking.timeTrackingRemaining}h remaining
      </span>
    ),
  };

  const showModal = async () => {
    if (task.taskInfo) {
      const currentUser = localStoreService.getUserLocal();
      const projectAuthor = (
        await projectService.getProjectDetail(task.taskInfo.projectId)
      ).data.content.creator.id;
      // console.log(projectAuthor, currentUser);
      if (currentUser.id === projectAuthor) {
        setVisible(true);
      } else {
        message.error("Không có quyền thay đổi thông tin task");
      }
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    setVisible(false);
    values.taskId = task.taskInfo?.taskId;
    values.description = editorRef.current.getContent();
    values.listUserAsign = values.listUserAsign.map((member) => {
      const memberNameToKeys = task.assigneesList.find(
        (curMember) => curMember.label === member
      )?.key;

      if (memberNameToKeys) {
        return memberNameToKeys;
      } else return member.key ? member.key : member;
    });

    console.log(values);

    taskService
      .updateTask(values)
      .then((res) => {
        message.success("Cập nhật thông tin task thành công");
        // console.log(task.taskInfo?.projectId);
        dispatch(getTaskListActionService(task.taskInfo?.projectId));
      })
      .catch((err) => {
        console.error(err);
        message.error(
          err.response.data?.content ||
            "Cập nhật thông tin task không thành công"
        );
      });
  };

  const onFinishFailed = (errInfo) => {
    console.log(errInfo);
  };

  return (
    <>
      <div
        className="space-x-2 cursor-pointer hover:text-gray-400"
        onClick={showModal}
      >
        <SettingOutlined />
        <span>Update Task</span>
      </div>

      {visible && (
        <Modal
          title="Edit task"
          maskClosable={false}
          visible={visible}
          onCancel={onCancel}
          footer={false}
        >
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
              projectId: task.taskInfo?.projectId,
              taskName: task.taskInfo?.taskName,
              statusId: task.taskInfo?.statusId,
              priorityId: task.taskInfo?.priorityId,
              typeId: task.taskInfo?.typeId,
              originalEstimate: task.taskInfo?.originalEstimate,
              timeTrackingSpent: timeTracking.timeTrackingSpent,
              timeTrackingRemaining: timeTracking.timeTrackingRemaining,
              listUserAsign: task.currenAssigness,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            scrollToFirstError
          >
            <Form.Item
              label={<span className="font-semibold">Project</span>}
              name="projectId"
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                disabled
              >
                {task.projectList}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Task name</span>}
              name="taskName"
              rules={[
                {
                  required: true,
                  message: "Tên task là bắt buộc",
                },
              ]}
            >
              <Input autoFocus />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Status</span>}
              name="statusId"
            >
              <Select>{task.status}</Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-semibold">Priority</span>}
                name="priorityId"
              >
                <Select>{task.priority}</Select>
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Task type</span>}
                name="typeId"
              >
                <Select>{task.taskType}</Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-semibold">Assignees</span>}
                name="listUserAsign"
              >
                <Select
                  ref={assigneesRef}
                  mode="multiple"
                  placeholder="Please select"
                  maxTagCount={5}
                  onChange={(value) => {
                    assigneesRef.current.blur();
                    // console.log(value);
                    setAssignesssState(
                      [...task.assigneesList].filter(
                        (val) =>
                          !value.find((v) => v === val.label || v === val.key)
                      )
                    );
                  }}
                >
                  {assignessState.map((val) => {
                    // console.log(assignessState);
                    return (
                      <Select.Option key={val.key} value={val.label}>
                        {val.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Time tracking</span>}
              >
                <Slider
                  marks={marks}
                  min={0}
                  max={
                    timeTracking.timeTrackingSpent +
                      timeTracking.timeTrackingRemaining >
                    0
                      ? timeTracking.timeTrackingSpent +
                        timeTracking.timeTrackingRemaining
                      : 100
                  }
                  value={timeTracking.timeTrackingSpent}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Form.Item
                className=" col-span-2"
                label={<span className="font-semibold">Original Estimate</span>}
                name="originalEstimate"
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Time spent</span>}
                name="timeTrackingSpent"
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Time remaining</span>}
                name="timeTrackingRemaining"
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: value,
                    })
                  }
                ></InputNumber>
              </Form.Item>
            </div>

            <Form.Item
              label={<span className="font-semibold">Description</span>}
              name="description"
            >
              <Editor
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                initialValue={task.taskInfo?.description}
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

            <Form.Item>
              <Space className="flex justify-end">
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
