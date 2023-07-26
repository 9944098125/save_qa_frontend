import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../Actions/Types";

const initialState = {
  token: localStorage.getItem("token"),
  user: {},
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  failMessage: "",
};

export default function login(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_id", JSON.stringify(payload.user.id));
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("is_authenticated", true);
      return {
        ...state,
        ...payload,
        loading: false,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
        failMessage: payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("logged_in");
      localStorage.removeItem("user");
      localStorage.removeItem("is_authenticated");
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
