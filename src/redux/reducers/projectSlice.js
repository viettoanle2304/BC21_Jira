import { createAction, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_PROJECT_INFO } from "../constants/project.constant";

let initialState = {
  projects: [],
};

const getAllProjectInfoAction = createAction(GET_ALL_PROJECT_INFO);

const projectSlice = createSlice({
  name: "projectList",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllProjectInfoAction]: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export default projectSlice.reducer;
