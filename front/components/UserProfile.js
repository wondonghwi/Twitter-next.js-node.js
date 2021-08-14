import { Avatar, Card, Button } from "antd";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { LOG_OUT_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>
              트위터
              <br />
            </a>
          </Link>
          {me.Posts.length}
        </div>,
        <div key="following">
          <Link href={`/profile`}>
            <a>
              팔로잉
              <br />
            </a>
          </Link>
          {me.Followings.length}
        </div>,
        <div key="follower">
          <Link href={`/profile`}>
            <a>
              팔로워
              <br />
            </a>
          </Link>
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
