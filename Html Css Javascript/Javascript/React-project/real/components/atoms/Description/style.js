import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

const defaultStyle = css`
  color: red;
`;

export const PrimaryDescription = styled.p`
  font-size: ${theme("fontSize.PrimaryDesc")}
`;

export const SecondaryDescription = styled.p`
  font-size: ${theme("fontSize.SecondaryDesc")}
`;