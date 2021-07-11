import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";

//all = 배열에 있는부분을 동시에 실행
//fork = 함수를 실행
//take = () 액션이 실행될때 까지 기다리겠다
//call = call해서 ()의 리턴값을 result변수에 받기
//put = dispatch -> put() 가로안의 action을 dispatch
//fork - call 차이
// -> fork : 비동기 함수 호출 (결과값 안기다림) , call : 동기 함수 호출 (결과값을 기다림)

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
