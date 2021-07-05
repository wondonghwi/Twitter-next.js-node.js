import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const configStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "poduction"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
