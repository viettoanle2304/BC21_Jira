import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Slider,
  Space,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTaskInfoActionService } from "../../../redux/actions/task.action";
import { projectService } from "../../../services/project.service";
import { taskService } from "../../../services/task.service";

export const CreateTaskForm = () => {
  const editorRef = useRef(null);
  const assigneesRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projectId, setProjectId] = useState(0);
  const [assigneesList, setAssigneesList] = useState([]);
  const { task } = useSelector((state) => state.taskSlice);
  const [assignessState, setAssignesssState] = useState([]);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

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

  useEffect(() => {
    dispatch(getTaskInfoActionService()).then((res) => {
      projectService
        .getUserByProjectId(projectId)
        .then((res) => {
          // console.log(res.data.content);
          const assigneesChildren = [];
          res.data.content.forEach((assignee) => {
            assigneesChildren.push({
              key: assignee.userId,
              label: assignee.name,
            });
          });

          setAssigneesList(assigneesChildren);
          setAssignesssState(assigneesChildren);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [projectId]);

  const handleProjectChange = (value) => {
    // console.log(value);
    setProjectId(value);
  };

  //   const handleAssigneesChange = (values) => {
  //     // console.log(values);
  //   };

  const onCancel = () => {
    navigate("/projectmanagement");
  };

  const onFinish = (values) => {
    values.description = editorRef.current.getContent();
    values.listUserAsign = values.listUserAsign.map((member) => {
      const memberNameToKeys = assigneesList.find(
        (curMember) => curMember.label === member
      )?.key;

      if (memberNameToKeys) {
        return memberNameToKeys;
      } else return member.key ? member.key : member;
    });
    console.log(values);
    taskService
      .createTask(values)
      .then((res) => {
        message.success("Task được khởi tạo thành công");

        setTimeout(() => {
          navigate(`/projectdetail/${projectId}`);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data.content);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
        statusId: "1",
        priorityId: 1,
        typeId: 1,
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
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
        rules={[
          {
            required: true,
            message: "Vui lòng chọn project",
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: "100%" }}
          onChange={handleProjectChange}
          autoFocus={true}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
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
            message: "Nhập tên task khởi tạo",
          },
        ]}
      >
        <Input />
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
                [...assigneesList].filter(
                  (val) => !value.find((v) => v === val.label || v === val.key)
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

        <Form.Item label={<span className="font-semibold">Time tracking</span>}>
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
              setTimeTracking({ ...timeTracking, timeTrackingSpent: value })
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
              setTimeTracking({ ...timeTracking, timeTrackingRemaining: value })
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
  );
};
