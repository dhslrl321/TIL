import React from 'react';

import { render } from "@testing-library/react";

import TodoForm from "./TodoForm";

describe('<TodoForm />', () => {
  it("has input and a button", () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);
    expect(getByPlaceholderText("할 일을 입력하세요")).not.toBeNull(); // input
    getByText("등록"); // button
  })
})