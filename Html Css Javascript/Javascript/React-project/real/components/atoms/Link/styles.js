import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';
import { Link } from "react-scroll";
export const Styles = css`
  font-size: ${theme("fontSizes.FirstLabel")};
  font-weight: bold;
  transition: 0.3s ease;
  cursor: pointer;
  :hover {
    color: #023CFF;
  }
  :active {
    color: #023CFF;
  }
`;

export const NextLink = styled.a`
  ${Styles};
`;

export const Anchor = styled(Link)`
  ${Styles};
  font-size: 0.8rem;
`;