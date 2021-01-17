import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';
import MyLink from "next/link";
export const Styles = css`
  font-size: ${theme("fontSizes.FirstLabel")};
  font-weight: bold;
  transition: 0.5s ease;
  :hover {
    color: #023CFF;
  }
`;

export const NextLink = styled.a`
  ${Styles}
`;

export const Anchor = styled.a`
  ${Styles}
`;