import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import CustomThemeProvider from "./CustomThemeProvider";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: ${({ theme }) => theme.colors.grey};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  color: ${({ theme }) => theme.colors.green};
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.Paragraph};
  color: ${({ theme }) => theme.colors.blue};
`;

const ThemeProviderPrac = () => {
  return (
    <div>
      <CustomThemeProvider>
        <Container>
          <Title>Hello</Title>
          <Subtitle>Welcome to styled-component's world</Subtitle>
          <Paragraph>ThemeProvider에 대해서 배워볼까요?</Paragraph>
        </Container>
      </CustomThemeProvider>
    </div>
  );
};

export default ThemeProviderPrac;
