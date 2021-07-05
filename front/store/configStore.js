import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import reducer from "../reducers";

const configStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
