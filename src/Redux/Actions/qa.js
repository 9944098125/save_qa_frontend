import {
  CREATE_START,
  CREATE_SUCCESS,
  CREATE_FAIL,
  READ_START,
  READ_SUCCESS,
  READ_FAIL,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from "./Types";
import { alertActions } from "./alert";
import Api from "../Api/Api";

export const create = (body) => async (dispatch) => {
  dispatch({
    type: CREATE_START,
  });
  try {
    const response = await Api.post("/qa/post-qa", body);
    if (response) {
      dispatch({
        type: CREATE_SUCCESS,
        payload: response.data && response.data.message,
      });
      // console.log(response);
      dispatch(alertActions.success(response.data?.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_FAIL,
      payload: err.response && err.response.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const read = (userId, toolId) => async (dispatch) => {
  dispatch({
    type: READ_START,
  });
  try {
    const response = await Api.get(`/qa/get-qa/${userId}/${toolId}`);
    if (response) {
      // console.log(response);
      dispatch({
        type: READ_SUCCESS,
        payload: response.data && response.data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: READ_FAIL,
      payload: err.response?.data,
    });
    dispatch(alertActions.error(err.response?.statusText));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const update = (qaId, body) => async (dispatch) => {
  dispatch({
    type: UPDATE_START,
  });
  try {
    const response = await Api.put(`/qa/update-qa/${qaId}`, body);
    if (response) {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: response.data && response.data.message,
      });
      dispatch(alertActions.success(response.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    });
  }
};

export const del = (qaId) => async (dispatch) => {
  dispatch({
    type: DELETE_START,
  });
  try {
    const response = await Api.delete(`/qa/delete-qa/${qaId}`);
    if (response) {
      dispatch({
        type: DELETE_SUCCESS,
        payload: response.data?.message,
      });
      dispatch(alertActions.success(response.data?.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response.data?.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    });
  }
};
