import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from "./Types";
import { alertActions } from "./alert";
import Api from "../Api/Api";

export const register = (data) => async (dispatch) => {
  dispatch({
    type: REGISTER_START,
  });
  try {
    const response = await Api.post("/auth/register", data);
    if (response) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data?.message,
      });
      //   console.log(response.data);
      dispatch(alertActions.success(response.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
