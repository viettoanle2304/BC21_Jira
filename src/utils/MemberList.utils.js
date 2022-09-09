import { Avatar, Button, message } from "antd";
import { getAllProjectInfoActionService } from "../redux/actions/project.action";
import { store } from "../redux/store";
import { projectService } from "../services/project.service";

export const tableMembers = [
  {
    title: "id",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => {
      return <Avatar src={avatar} />;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "userId",
    key: "action",
    render: (userId, record) => {
      return (
        <div>
          <Button
            className="bg-red-600 border-red-600 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-white hover:text-red-600 hover:border-red-600 focus:bg-white focus:text-red-600 focus:border-red-600"
            onClick={() => {
              const deleteData = Object.assign(
                {},
                { projectId: record.projectId, userId: userId }
              );
              // console.log(deleteData);

              projectService
                .deleteMember(deleteData)
                .then((res) => {
                  // console.log(res.status);
                  message.success("Xoá thành viên dự án thành công");
                  store.dispatch(getAllProjectInfoActionService());
                })
                .catch((err) => {
                  message.error(err.response.data.content);
                });
            }}
          >
            <i className="fa-solid fa-x"></i>
          </Button>
        </div>
      );
    },
  },
];
