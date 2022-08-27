import { Avatar, Button, Popover } from "antd";
import { MemberList } from "../pages/ProjectManagementPage/MemberList/MemberList";

export const tableProject = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
    render: (creator) => {
      if (creator.name) {
        return (
          <span
            style={{ border: "1px solid rgb(34, 194, 94)" }}
            className=" text-green-700 py-1 px-3  bg-green-200 cursor-pointer rounded"
          >
            {creator.name}
          </span>
        );
      } else return <></>;
    },
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    render: (memberList) => {
      return (
        <Popover
          placement="bottom"
          content={() => <MemberList memberList={memberList} />}
          title="Members"
        >
          <div className="flex relative w-min">
            <Avatar.Group
              className="cursor-pointer"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {memberList.map((member, i) => (
                <Avatar src={member.avatar} key={i} />
              ))}
              <Avatar
                className="flex justify-center items-center bg-[#fde3cf] hover:bg-white hover:border-2 hover:border-[#fde3cf]"
                style={{
                  color: "#f6822a",
                }}
                onClick={() => {
                  console.log("clicked");
                }}
              >
                +
              </Avatar>
            </Avatar.Group>
          </div>
        </Popover>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => {
      return (
        <div className="flex space-x-2">
          <Button className="bg-green-600 border-green-600 text-white w-10 h-10 rounded-full flex justify-center items-center hover:bg-white hover:text-green-600 hover:border-green-600 focus:bg-white focus:text-green-600 focus:border-green-600">
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button className="bg-red-600 border-red-600 text-white rounded-full w-10 h-10 flex justify-center items-center hover:bg-white hover:text-red-600 hover:border-red-600 focus:bg-white focus:text-red-600 focus:border-red-600">
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      );
    },
  },
];
