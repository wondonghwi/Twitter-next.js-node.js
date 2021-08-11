import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configStore";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  //TODO 인피니티스크롤 커스텀 훅
  useInfinityScroll({
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
  });

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

//화면이 랜더링되기 전에, Home보다 먼저 실행!
export const getServerSideProps = wrapper.getServerSideProps((context) => {
  console.log(context);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
});

export default Home;
