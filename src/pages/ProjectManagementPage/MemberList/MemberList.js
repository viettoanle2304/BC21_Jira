import { Table } from "antd";
import React from "react";
import { tableMembers } from "../../../utils/MemberList.utils";
import { v4 as uuidv4 } from "uuid";

export const MemberList = ({ memberList }) => {
  return (
    <Table
      className="px-3 pb-3"
      dataSource={memberList}
      columns={tableMembers}
      rowKey={() => uuidv4()}
      size="small"
      pagination={false}
    />
  );
};
