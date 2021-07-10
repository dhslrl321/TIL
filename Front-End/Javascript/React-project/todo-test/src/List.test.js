import React from 'react';

import { render, fireEvent } from "@testing-library/react";

import List from "./List";

// describe => 설명할 테스트 대상을 명시 ex) component
// it => test() 함수와 같은 역할 it 안에 expect.tobe를 넣음, 테스트 대상의 행동, 테스트 서술
// [context] => 테스트 대상이 놓인 상황 설명 (when, with) [Optional]

// describe("컴포넌트를 테스트할거면 컴포넌트 이름")

test("List with tasks", () => {

  const tasks = [
    { id: 1, title: "혜진이랑 뽀뽀 Task 1" },
    { id: 2, title: "혜진이랑 허그 Task 2" },
  ]

  const onClickDelete = jest.fn();

  const { getAllByText, getByText } = render(
    (<List
      tasks={tasks}
      onClickDelete={onClickDelete} />));

  // expect(container).toHaveTextContent("혜진이랑 허그 Task 2");
  expect(getByText("혜진이랑 뽀뽀 Task 1")).not.toBeNull();
  expect(getByText("혜진이랑 허그 Task 2")).not.toBeNull();
  expect(getAllByText("완료")).not.toBeNull();

  const buttons = getAllByText("완료");

  fireEvent.click(buttons[0]);
  expect(onClickDelete).toBeCalledWith(1);
});

test("Lists without tasks", () => {

  const tasks = [];

  const onClickDelete = jest.fn();

  const { getByText } = render(
    <List
      tasks={tasks}
      onClickDelete={onClickDelete} />);

  expect(getByText("할 일이 없습니다.")).not.toBeNull();
});

// describe("List", () => {

//   const onClickDelete = jest.fn();

//   const renderList = () => {
//     const tasks = [
//       { id: 1, title: "Task 1" },
//       { id: 2, title: "Task 2" }
//     ]
//     return { getByText, getAllByText } = render(
//       <List
//         tasks={tasks}
//         onClickDelete={onClickDelete} />);
//   }

//   context("with tasks", () => {
//     it("renders task", () => {
//       const { getByText } = renderList();
//       expect(getByText("Task 1")).not.toBeNull();
//       expect(getByText("Task 2")).not.toBeNull();
//     })
//     it("renders '완료' button to delete a task", () => {
//       const { getAllByText } = renderList();
//       expect(getAllByText("완료")[0]).not.toBeNull();
//     })
//   })
//   context("without tasks", () => {
//     it("renders no task message", () => {

//     })
//   })
// });

/* describe("List", () => {

  context("With Tasks", () => {

  })
  context("Without Tasks", () => {

  })
}); */
