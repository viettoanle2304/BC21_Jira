import { Avatar, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { tableMembers } from "../../../utils/MemberList.utils";
import { v4 as uuidv4 } from "uuid";
import { projectService } from "../../../services/project.service";
import { AddUserModal } from "./AddUserModal";

export const MemberList = ({ id }) => {
  const [members, setMembers] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    projectService
      .getUserByProjectId(id)
      .then((res) => {
        // console.log(res.data);
        const membersList = res.data.content.map((member) => ({
          ...member,
          projectId: id,
        }));
        setMembers(membersList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClickChange = (visible) => {
    setHovered(false);
  };

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };

  const content = (function () {
    return (
      <Table
        className="px-3 pb-3"
        dataSource={members}
        columns={tableMembers}
        rowKey={() => uuidv4()}
        size="small"
        pagination={false}
      />
    );
  })();

  return (
    <Popover
      placement="bottom"
      content={content}
      title="Members"
      trigger="hover"
      visible={hovered}
      onVisibleChange={handleHoverChange}
      onClick={handleClickChange}
    >
      <div className="flex relative w-min">
        <Avatar.Group
          className="cursor-pointer"
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {members.map((member, i) => (
            <Avatar src={member.avatar} key={i} />
          ))}
          <AddUserModal />
        </Avatar.Group>
      </div>
    </Popover>
  );
};
