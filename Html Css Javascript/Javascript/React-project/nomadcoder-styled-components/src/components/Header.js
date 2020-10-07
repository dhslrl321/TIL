import React from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
  padding: 15px 20px;
  color: ${props => props.current ? "#0050FF" : "gray"};
  border-bottom: 4px solid 
  ${props => props.current ? "#0050FF" : "transparent"};
`;

const SItem = styled.li`
  text-align: center;
`;

const SList = styled.ul`
    display: flex;
`;

const SHeader = styled.header`
  display: flex;
  padding: 0px 30px; 
  width: 100%;
  height: 55px;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  ${SList}:first-child {
    margin-right: auto;
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <SHeader>
    <SList>
      <SItem>
        <SLink current={false} to="/">DESIGN BASE</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/about"} to="/about">소개</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/course-design"} to="/course-design">디자인 강좌</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/course-coding"} to="/course-coding">웹코딩 강좌</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/bookmark"} to="/bookmark">북마크</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/meetup"} to="/meetup">밋업</SLink>
      </SItem>
    </SList>
    <SList>
      <SItem>
        <SLink current={pathname === "/contact"} to="/contact">문의하기</SLink>
      </SItem>
    </SList>
  </SHeader>
));
