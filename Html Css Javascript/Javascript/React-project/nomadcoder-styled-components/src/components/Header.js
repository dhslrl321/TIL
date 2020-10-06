import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const SList = styled.ul`
  display: flex;
  border: solid 1px;
`;

const SItem = styled.li`
  width: 90px;
  text-align: center;
`;

const SLink = styled(Link)`
`;

const SHeader = styled.header`
  display: flex;
  padding: 0px 30px;
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  ${SList}:first-child {
    justify-self: start;
  }
  ${SList}:not(:first-child) {
    justify-self: end;
  }
`;
export const Header = () => {
  return (
    <SHeader>
      <SList>
        <SItem>
          <SLink to="/">Design Base</SLink>
        </SItem>
      </SList>
      <SList>
        <SItem>
          <SLink to="/about">소개</SLink>
        </SItem>
      </SList>
      <SList>
        <SItem>
          <SLink to="/course-design">디자인 강좌</SLink>
        </SItem>
      </SList>
      <SList>
        <SItem>
          <SLink to="/course-coding">웹코딩 강좌</SLink>
        </SItem>
      </SList>
      <SList>
        <SItem>
          <SLink to="/meetup">밋업</SLink>
        </SItem>
      </SList>
      <SList>
        <SItem>
          <SLink to="/contact">문의하기</SLink>
        </SItem>
      </SList>
    </SHeader>
  );
}