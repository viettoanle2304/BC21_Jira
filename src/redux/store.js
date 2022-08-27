import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./reducers/spinnerSlice.js";
import { userReducer } from "./reducers/user.reducer.js";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    spinnerSlice: spinnerSlice,
  },
});
