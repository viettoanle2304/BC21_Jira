import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./reducers/spinnerSlice.js";
import { userReducer } from "./reducers/user.reducer.js";
import projectSlice from "./reducers/projectSlice.js";
import taskSlice from "./reducers/taskSlice.js";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    spinnerSlice: spinnerSlice,
    projectSlice: projectSlice,
    taskSlice: taskSlice,
  },
});
