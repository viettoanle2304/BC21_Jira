import { DeleteProjectButton } from "../pages/ProjectManagementPage/DeleteProjectButton";
import { EditProjectModal } from "../pages/ProjectManagementPage/EditProjectModal/EditProjectModal";
import { MemberList } from "../pages/ProjectManagementPage/MemberList/MemberList";

const sorter = (a, b) =>
  isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b;

export const tableProject = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => sorter(a.id, b.id),
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    sorter: (a, b) => sorter(a.projectName, b.projectName),
    render: (projectName, record) => {
      return (
        <span
          className="cursor-pointer"
          onClick={() => {
            window.open(`/projectdetail/${record.id}`, "_self");
          }}
        >
          {projectName}
        </span>
      );
    },
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
    filters: [
      { text: "Dự án web", value: "Dự án web" },
      { text: "Dự án phần mềm", value: "Dự án phần mềm" },
      { text: "Dự án di động", value: "Dự án di động" },
    ],
    sorter: (a, b) => sorter(a.categoryName, b.categoryName),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.categoryName.includes(value),
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
    dataIndex: "id",
    key: "members",
    render: (id) => <MemberList id={id} />,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (action, record) => {
      return (
        <div className="flex space-x-2">
          <EditProjectModal project={record} />
          <DeleteProjectButton project={record} />
        </div>
      );
    },
  },
];
