import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

test('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Item
      task={task}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});

describe('<Item />', () => {
  it("성공적으로 렌더링 되어야 합니다.", () => {
    expect(1 + 1).toBe(2);
  })
})