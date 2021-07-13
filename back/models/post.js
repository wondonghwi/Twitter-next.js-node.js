module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowDots: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //이모티콘 저장
    }
  );
  Post.association = (db) => {};
  return Post;
};
