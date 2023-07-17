import { combineReducers } from "redux";

import alert from "./alert";
import register from "./register";
import login from "./login";
import toggleThemeReducer from "./toggleTheme";
import qa from "./qa";

export default combineReducers({
  alert,
  register,
  login,
  toggleThemeReducer,
  qa,
});
