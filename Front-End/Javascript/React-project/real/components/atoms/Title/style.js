import styled, { css } from 'styled-components';
import { theme } from "styled-tools";

const defaultStyle = css`
  font-weight: bold;
`;

export const MainTitle = styled.h1`
  ${defaultStyle}
  font-size: ${theme("fontSize.MainTitle")};
`;

export const SubTitle = styled.h3`
  ${defaultStyle}
  font-size: ${theme("fontSize.SubTitle")};
`;