const express = require("express");
const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

//GET posts (여러개 가져오는경우 사용) - 단수 / 복수 구분
router.get("/", async (req, res, next) => {
  try {
    console.log("성공");
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt , DESC"]],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log("실패");
    console.log(error);
    next(error);
  }
});

module.exports = router;
