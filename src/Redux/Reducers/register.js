import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../Actions/Types";

const initialState = {
  loading: false,
  successMessage: "",
  failMessage: "",
};

export default function register(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
