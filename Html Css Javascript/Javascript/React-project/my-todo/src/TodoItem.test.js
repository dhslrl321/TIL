import React from 'react';

import { render, fireEvent } from "@testing-library/react";

import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {

  const todo = {
    id: 1,
    title: "Task1"
  };

  const onClickDelete = jest.fn();

  const { getByText } = render(
    <TodoItem
      todo={todo}
      onClickDelete={onClickDelete} />)

  it("item with text Task1", () => {
    expect(getByText("Task1")).not.toBeNull();
  })

  it("button with text 완료", () => {
    expect(getByText("완료")).not.toBeNull();
  })
})

