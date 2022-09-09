import { Avatar, message, Popover, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProjectInfoActionService } from "../../../redux/actions/project.action";
import { localStoreService } from "../../../services/localStore.service";
import { projectService } from "../../../services/project.service";
import { userServices } from "../../../services/user.service";

export const AddUserModal = ({ projectId }) => {
  const [checkAuthorization, setCheckAuthorization] = useState(false);
  const [projectInfo, setProjectInfo] = useState({});
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { Option } = Select;
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const currentUser = localStoreService.getUserLocal();
    projectService
      .getProjectDetail(projectId)
      .then((res) => {
        const project = res.data.content;

        if (project.creator.id === currentUser.id) {
          setCheckAuthorization(true);
        } else setCheckAuthorization(false);

        setProjectInfo(project);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    userServices
      .getUser()
      .then((res) => {
        const childrenList = [];
        res.data.content.forEach((item) => {
          childrenList.push(
            <Option key={item.userId} value={item.userId}>
              {item.name}
            </Option>
          );
        });

        setChildren(childrenList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    // console.log(projectInfo.members);

    if (projectInfo.members.find((member) => member.userId === value)) {
      //   console.log("existed");
      message.error("Thành viên đã tồn tại trong dự án");
    } else {
      //   console.log("non-existed");
      const assignedUser = Object.assign(
        {},
        { projectId: projectId, userId: value }
      );
      projectService
        .assignUserProject(assignedUser)
        .then((res) => {
          //   console.log("success");
          message.success("Thêm thành viên thành công");
          dispatch(getAllProjectInfoActionService());
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setVisible(false);
  };

  const handleClickChange = () => setVisible(true);

  const popoverContent = (
    <Select
      showSearch
      style={{
        width: "100%",
      }}
      showArrow={false}
      onChange={handleChange}
      autoFocus={true}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {children}
    </Select>
  );

  return (
    <>
      {checkAuthorization ? (
        <Popover
          placement="right"
          title="Add users"
          content={popoverContent}
          visible={visible}
          trigger="click"
          onVisibleChange={handleClickChange}
        >
          <Avatar
            className="flex justify-center items-center bg-[#fde3cf] hover:bg-white hover:border-2 hover:border-[#fde3cf]"
            style={{
              color: "#f6822a",
            }}
          >
            +
          </Avatar>
        </Popover>
      ) : (
        <Avatar
          className="flex justify-center items-center bg-[#fde3cf] hover:bg-white hover:border-2 hover:border-[#fde3cf]"
          style={{
            color: "#f6822a",
          }}
          onClick={() =>
            message.error("Chỉ creator dự án mới có quyền thêm thành viên")
          }
        >
          +
        </Avatar>
      )}
    </>
  );
};
