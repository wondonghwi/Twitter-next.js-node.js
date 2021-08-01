import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { LOAD_USER_REQUEST } from "../reducers/user";

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

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [dispatch]);

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

export default Home;
