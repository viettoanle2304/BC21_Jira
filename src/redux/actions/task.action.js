import { Select } from "antd";
import { localStoreService } from "../../services/localStore.service";
import { projectService } from "../../services/project.service";
import { taskService } from "../../services/task.service";
import { GET_TASK_INFO, GET_TASK_LIST } from "../constants/task.constant";

export const getTaskInfoActionService = (taskId) => {
  return async (dispatch) => {
    const fakeState = {
      projectList: [],
      status: [],
      priority: [],
      taskType: [],
      assigneesList: [],
      taskInfo: {},
      currenAssigness: [],
    };

    try {
      const currentUser = localStoreService.getUserLocal();
      const projects = (
        await projectService.getAllProject()
      ).data.content.filter((project) => project.creator.id === currentUser.id);
      projects.forEach((project) => {
        fakeState.projectList.push(
          <Select.Option value={project.id}>
            {project.projectName}
          </Select.Option>
        );
      });
    } catch {
      fakeState.projectList = [];
    }

    const status = (await taskService.getAllStatus()).data.content;
    status.forEach((status) => {
      fakeState.status.push(
        <Select.Option value={status.statusId}>
          {status.statusName}
        </Select.Option>
      );
    });

    const priority = (await taskService.getAllPriority()).data.content;
    priority.forEach((priority) => {
      fakeState.priority.push(
        <Select.Option value={priority.priorityId}>
          {priority.priority}
        </Select.Option>
      );
    });

    const taskType = (await taskService.getAllTaskType()).data.content;
    taskType.forEach((taskType) => {
      fakeState.taskType.push(
        <Select.Option value={taskType.id}>{taskType.taskType}</Select.Option>
      );
    });

    try {
      const taskInfo = (await taskService.getTaskDetail(taskId)).data.content;
      fakeState.taskInfo = taskInfo;
      const projectId = taskInfo.projectId;

      const assignees = (await projectService.getUserByProjectId(projectId))
        .data.content;

      assignees?.forEach((assignee) => {
        fakeState.assigneesList.push({
          key: assignee.userId,
          label: assignee.name,
        });
        if (
          Object.values(taskInfo.assigness)
            .map((val) => val.id)
            .includes(assignee.userId)
        ) {
          fakeState.currenAssigness.push({
            key: assignee.userId,
            label: assignee.name,
          });
        }
      });
    } catch {
      fakeState.assigneesList = [];
    }

    return new Promise((resolve, reject) => {
      dispatch({
        type: GET_TASK_INFO,
        payload: fakeState,
      });

      resolve(fakeState);
    });
  };
};

export const getTaskListActionService = (projectId) => {
  return async (dispatch) => {
    const taskList = (await projectService.getProjectDetail(projectId)).data
      .content.lstTask;

    return new Promise((resolve, reject) => {
      dispatch({
        type: GET_TASK_LIST,
        payload: taskList,
      });

      resolve(taskList);
    });
  };
};
