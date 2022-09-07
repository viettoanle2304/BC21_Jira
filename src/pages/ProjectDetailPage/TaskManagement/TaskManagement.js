import { Avatar } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TaskControls } from "./TaskControls";

export const TaskManagement = ({ headerName, project }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const taskList = project.lstTask?.find(
      (taskLst) => taskLst.statusName === headerName
    ).lstTaskDeTail;

    // console.log(taskList);
    setTaskList(taskList);
  }, [headerName, project]);

  return (
    <div className="py-2 bg-gray-200 w-full border-3 border-gray-400 border-solid rounded-xl shadow">
      <header className="px-3 xl:px-4 py-2">
        <h4 className="text-gray-400 font-semibold">{headerName}</h4>
      </header>

      <div className="">
        {taskList?.map((task, i) => {
          return (
            <div key={i} className="bg-white px-3 py-2 xl:py-4">
              <div className="flex justify-between relative">
                {task.taskName.slice(0, 1).toUpperCase() +
                  task.taskName.slice(1)}

                <div className="">
                  <TaskControls />
                </div>
              </div>

              <div className="flex justify-between items-center mt-2 xl:mt-5 mb-2">
                <p
                  className={`m-0 ${
                    task.priorityTask.priority === "High" && "text-red-500"
                  } ${
                    task.priorityTask.priority === "Medium" && "text-yellow-500"
                  } ${
                    task.priorityTask.priority === "Low" && "text-green-500"
                  } ${
                    task.priorityTask.priority === "Lowest" && "text-blue-500"
                  }`}
                >
                  {task.priorityTask.priority}
                </p>

                <div className="flex items-center">
                  {task.assigness.map((member, i) => {
                    return (
                      <Avatar
                        key={i}
                        className="cursor-pointer"
                        src={member.avatar}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
