import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone, setCommentText]);

  const onSubmitComment = useCallback(() => {
    console.log(commentText , id , post.id);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, userId: id, postId: post.id },
    });
  }, [commentText, dispatch, id, post.id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <div style={{ position: "absolute", right: 0, bottom: -40 }}
        >
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          {/*TODO 확인 안눌리는거 체크*/}
          확인
        </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
