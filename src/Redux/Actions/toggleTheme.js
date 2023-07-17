import { TOGGLE_THEME } from "./Types";

export const toggleThemeAction = () => (dispatch) => {
  dispatch({
    type: TOGGLE_THEME,
  });
};
