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
} from "../Actions/Types";

const initialState = {
  successMessage: "",
  failMessage: "",
  loading: false,
  qaList: [],
};

export default function qa(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: payload,
      };
    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case READ_START:
      return {
        ...state,
        loading: true,
      };
    case READ_SUCCESS:
      return {
        ...state,
        loading: false,
        qaList: payload,
      };
    case READ_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case UPDATE_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: payload,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case DELETE_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: payload,
      };
    case DELETE_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
