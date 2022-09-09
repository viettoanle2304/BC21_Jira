import { createAction, createSlice } from "@reduxjs/toolkit";
import { GET_TASK_INFO, GET_TASK_LIST } from "../constants/task.constant";

const initialState = {
  task: {},
  taskLst: [],
};

const getTaskInfoAction = createAction(GET_TASK_INFO);
const getTaskListAction = createAction(GET_TASK_LIST);

const taskSlice = createSlice({
  name: "taskInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getTaskInfoAction]: (state, action) => {
      state.task = action.payload;
    },
    [getTaskListAction]: (state, action) => {
      state.taskLst = action.payload;
    },
  },
});

export default taskSlice.reducer;
