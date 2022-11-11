import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewaresToApply = [thunk];

function configureStore() {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(...middlewaresToApply),
          // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(...middlewaresToApply)
  );

  return store;
}

export const store = configureStore();
