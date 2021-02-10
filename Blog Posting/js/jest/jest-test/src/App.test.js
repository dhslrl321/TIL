import { render, screen } from '@testing-library/react';
import App from './App';

test('화면 테스트', () => {
  render(<App />);
  const linkElement = screen.getByText('hello world');
  expect(linkElement).toBeInTheDocument();
});

test("계산기 렌더 테스트", () => {
  render(<App />);
  const
})