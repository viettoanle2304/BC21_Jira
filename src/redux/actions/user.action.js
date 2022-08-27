import { localStoreService } from "../../services/localStore.service.js";
import { userServices } from "../../services/user.service.js";
import { SET_USER_INFO } from "../constants/user.constant.js";

export const setUserInfoActionService = (dataLogin, onSuccess, onFail) => {
  return (dispatch) => {
    userServices
      .login(dataLogin)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: SET_USER_INFO,
          payload: res.data.content,
        });
        localStoreService.setUserLocal(res.data.content);

        onSuccess();
      })
      .catch((err) => {
        console.error(err);
        onFail(err.response.data.message);
      });
  };
};
