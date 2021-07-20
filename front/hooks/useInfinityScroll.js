//TODO 스크롤에 따라서 인피니티스크롤 실행하는 코드
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { useDispatch } from "react-redux";

const useInfinityScroll = ({ mainPosts, hasMorePosts, loadPostsLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      // 아래에서 300px 까지 왔을때 Request
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        // 처음부터 request를 안보내기위해 && !loadPostsLoading 코드추가
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            // data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    };
    // scroll event listener 등록
    window.addEventListener("scroll", onScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", onScroll);
    };
  }, [dispatch, hasMorePosts, loadPostsLoading, mainPosts]);
};

export default useInfinityScroll;
