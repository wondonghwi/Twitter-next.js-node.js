const express = require("express");

const { Post } = require("../models");

const router = express.Router();

// POST /post
router.post("/", async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /post/1/comment
router.post("/:postId/comment", async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE /post
router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
