import React, { useLayoutEffect, useState } from "react";
import { Input, Menu, Row, Col } from "antd";
import Link from "next/link";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
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
