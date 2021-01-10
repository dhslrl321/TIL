import styled, { css } from 'styled-components';
import { theme } from "styled-tools";

const TitleStyle = css`
  font-weight: bold;
`;

export const MainTitle = styled.h1`
  ${TitleStyle}
  font-size: ${theme("fontSize.MainTitle")};
`;

export const SubTitle = styled.h3`
  ${TitleStyle}
  font-size: ${theme("fontSize.SubTitle")};
`;