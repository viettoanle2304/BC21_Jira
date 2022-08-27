import { createAction, createReducer } from "@reduxjs/toolkit";
import { localStoreService } from "../../services/localStore.service.js";
import { SET_USER_INFO } from "../constants/user.constant.js";
// import { SET_USER_INFO } from "../constants/user.constant";

let initialState = {
  userInfo: localStoreService.getUserLocal(),
};

const setUserInfoAction = createAction(SET_USER_INFO);

export const userReducer = createReducer(initialState, {
  [setUserInfoAction]: (state, action) => {
    state.userInfo = action.payload;
  },
});
