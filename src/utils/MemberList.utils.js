import { Avatar, Button } from "antd";

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
    dataIndex: "action",
    key: "action",
    render: () => {
      return (
        <div>
          <Button className="bg-red-600 border-red-600 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-white hover:text-red-600 hover:border-red-600 focus:bg-white focus:text-red-600 focus:border-red-600">
            <i className="fa-solid fa-x"></i>
          </Button>
        </div>
      );
    },
  },
];
