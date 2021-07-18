import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태 /
// combineReducers = reducer합쳐주는 메소드
const rootReducer = combineReducers({
  //SSR을 위해서 index: 추가한 것!
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
