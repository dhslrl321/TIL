import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import media from "./media";

const Div = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle};

  ${({ theme }) => theme.tablet`
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSizes.paragraph};
  `};

  width: 100vw;
  height: 100vh;
  background: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Div2 = styled.div`
  width: 100px;
  height: 100px;
  background: white;
  margin: 5px;
`;
const ThemeProviderPrac = () => {
  return (
    <ThemeProvider theme={{ ...media, ...theme }}>
      <Div>
        <Div2>정말로</Div2>
        <Div2>리액트</Div2>
        <Div2>재밌어요</Div2>
        <Div2>진짜로</Div2>
      </Div>
    </ThemeProvider>
  );
};

export default ThemeProviderPrac;
