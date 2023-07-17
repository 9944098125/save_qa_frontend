import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const login = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
  try {
    const response = await Api.post("/auth/login", data);
    // taking data from parameters and putting it in url as body
    if (response) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data && response.data,
      });
      // and giving the data from response to payload which returns
      // user, token and message
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data,
    });
    // if some error like wrong password or something it shows
    // a failure modal
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
