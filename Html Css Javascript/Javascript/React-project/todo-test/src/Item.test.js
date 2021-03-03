import React from 'react';

import { render, fireEvent } from "@testing-library/react";

import Item from "./Item";



test("Item", () => {

  const task = {
    id: 1,
    title: "아무거나 하기",
  }

  // 함수를 jest.fn() 로 불러오기;
  const onClickDelete = jest.fn();

  const { container, getByText } = render((
    <Item
      task={task}
      onClickDelete={onClickDelete} />));  // 테스트 전처리

  // 실질적인 테스트 코드
  // 기본 : expect(테스트 하고싶은 코드).toBe(기대하는 것);
  expect(container).toHaveTextContent("아무거나 하기");
  expect(container).toHaveTextContent("완료");

  expect(onClickDelete).not.toBeCalled();
  fireEvent.click(getByText("완료"));
  expect(onClickDelete).toBeCalledWith(1);
});