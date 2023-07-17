import { SUCCESS, ERROR, SUCCESS_CLEAR, ERROR_CLEAR, CLEAR } from "./Types";

// taking message to check that if message in this function exists
function success(message) {
  return {
    type: SUCCESS,
    message,
  };
}

// this is the error
function error(message) {
  return {
    type: ERROR,
    message,
  };
}

// and here we are sending an empty message
// so no message goes to the components
// and if no message it shows nothing
function success_clear() {
  return { type: SUCCESS_CLEAR };
}

function error_clear() {
  return { type: ERROR_CLEAR };
}

// finally every message is cleared error or success
function clear() {
  return { type: CLEAR };
}

export const alertActions = {
  success,
  success_clear,
  error,
  error_clear,
  clear,
};
