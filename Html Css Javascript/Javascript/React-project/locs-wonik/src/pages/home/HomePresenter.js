import React from 'react';
import styled from "styled-components";
import Section from "../../components/Section";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TodoBlock = styled.div`
  margin-top: 160px;
  width: 550px;
  height: 700px;
  background-color: #1E1E1E;
  box-shadow: 1px 1px 7px #BB86FA;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TopBlock = styled.div`
  height: 15%;
`;

const Title = styled.span`
  display: block;
  font-size: 30px;
  border-bottom: 1px solid #BB86CA;
`;
const DateTime = styled.span`
  display:block;
`;

const LastTodo = styled.span`
  color: #BB86CA;
  display: block;
`;
const BottomBlock = styled.div`
  height: 85%;
  border: 1px solid;
`;

const TodoItem = ({ className, checked, name }) => {
  return (
    <div>
      {checked} {name}
    </div>
  );
}

const HomePresenter = () => {
  return (
    <Container>
      <TodoBlock>
        <TopBlock>
          <Title>나만의 멋진 DDoDo List</Title>
          <DateTime>2020년 10월 14일(수)</DateTime>
          <LastTodo>할 일 2개 남음</LastTodo>
        </TopBlock>
        <BottomBlock>

        </BottomBlock>
      </TodoBlock>
    </Container>
  );
}

export default HomePresenter;