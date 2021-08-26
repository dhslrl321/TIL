import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

// test("Input인가", () => {
//   const { container, getByText, getByPlaceholderText } = render(<Input />);

//   fireEvent.click(getByPlaceholderText("할 일을 입력해 주세요"));
//   fireEvent.click(getByText());
// });
const value = "hello"

describe("<Input />", () => {
  it("rendering test", () => {
    const { getByText } = render(<Input />);
    const placeholder = getByText("할 일을 입력해 주세요");
    expect(placeholder).toBeInTheDocument();
  })
})