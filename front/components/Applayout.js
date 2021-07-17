import React from "react";
import { Col, Input, Menu, Row } from "antd";
import Link from "next/link";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

//TODO _app.js와 별개로 일부만 (사용한애들만) 공통

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="searchInput">
          <SearchInput enterButton />
        </Menu.Item>
        {!me && (
          <Menu.Item key="signup">
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/wondonghwi"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Wondonghwi
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
