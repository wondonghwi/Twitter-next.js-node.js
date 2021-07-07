export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "원동휘",
      },
      content: "첫 번째 게시글 #해시태그 #먹방",
      Images: [
        {
          src: "https://i.ytimg.com/vi/DhK14sY3mT4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgwB1QW8ivw_9MT1QP8QTbFgO9Bg",
        },
        {
          src: "https://i.ytimg.com/vi/DhK14sY3mT4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgwB1QW8ivw_9MT1QP8QTbFgO9Bg",
        },
        {
          src: "https://i.ytimg.com/vi/DhK14sY3mT4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgwB1QW8ivw_9MT1QP8QTbFgO9Bg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "won",
          },
          content: "두 번째 게시클 #넥스트 #고기",
        },
        {
          User: {
            nickname: "dong",
          },
          content: "넥스트다!",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "동그리동",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default:
      return state;
  }
};
export default reducer;
