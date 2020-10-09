import React from 'react';
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  cursor: pointer;
  &:hover {
     color: #ff9b6b;
   }
   display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

function TodoItem({ id, done, text }) {
  return (
    <TodoItemBlock>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}