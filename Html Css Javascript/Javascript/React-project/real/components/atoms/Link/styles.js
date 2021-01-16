import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

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