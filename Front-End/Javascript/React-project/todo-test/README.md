# React Testing Library 주요 API

- `render()` : DOM 에 컴포넌트를 렌더링
- `fireEvent 객체` : 특정 이벤트를 발생시켜주는 객체
- 여기에 추가로 DOM의 특정 영역을 선택하는 다양한 쿼리

## `Render()` 함수

- `@testing-libaray/react` 모듈에서 바로 임포트가 가능
- 인자로 렌더링 할 React 컴포넌트를 넘기면 됨
- RTL 이 제공하는 모든 쿼리 함수와 유틸리티 함수가 있는 객체 반환

```js
import { render, fireEvent } from "@testing-library/react";

const { getByText, getByLabelText, getByPlaceholderText } = render(
  <YourComponent />
);
```

1. Test 디렉토리 따로 만들고 싶음
2. 왜 render() 는 안 씀?
3. Scenario vs describe it
4. unit test 랑 e2e 테스트의 차이
