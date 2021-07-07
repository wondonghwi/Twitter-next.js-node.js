import { all, fork, put, call, take } from "redux-saga/effects";
import axios from "axios";

//all = 배열에 있는부분을 동시에 실행
//fork = 함수를 실행
//take = () 액션이 실행될때 까지 기다리겠다
//call = call해서 ()의 리턴값을 result변수에 받기

//fork - call 차이
// -> fork : 비동기 함수 호출 (결과값 안기다림) , call : 동기 함수 호출 (결과값을 기다림)

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/out");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield take("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
