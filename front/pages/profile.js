import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configStore";
import axios from "axios";
import { END } from "redux-saga";
import useSWR from "swr";

const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  //어떻게 swr을 불러올지 정하는
  // 함수 -> url로 useSWR(args)가 들어옴
  //withCredentials : true -> 서버와 도메인이 다를경우 쿠키전달을 위함
  const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((result) => result.data);

  //팔로워
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  //팔로잉
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  useEffect(() => {
    //로그인 안했을때 home으로 리다이렉트
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return "내정보 로딩중...";
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingsData && !followingError}
      />
      <FollowList
        header="팔로워"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followersData && !followerError}
      />
    </AppLayout>
  );
};

//화면이 랜더링되기 전에 가장먼저 실행!
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      console.log("Profile getServerSideProps start");
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Profile;
