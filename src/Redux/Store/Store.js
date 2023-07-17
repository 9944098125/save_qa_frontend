import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import SetAuthToken from "../../Utils/SetAuthToken";

import rootReducer from "../Reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState;

store.subscribe(() => {
  // this store.subscribe() listens to the
  // state changes of central state management
  currentState = store.getState();
  const token = currentState.login.token;
  // here we are saying to store.subscribe() listener
  // to take the token from the store's current state and pass that
  // token to setAuthToken function so that it is sent to backend
  // for token verification with the request
  SetAuthToken(token);
});

export default store;
