import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

const defaultStyle = css`
  
`;

export const PrimaryLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.PrimaryLabel")};
`;

export const SecondaryLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.SecondaryLabel")};
`;

export const PrimaryDescription = styled.p`
  ${defaultStyle};
  font-size: ${theme("fontSize.PrimaryDescription")};
`;

export const SecondaryDescription = styled.p`
  ${defaultStyle};
  font-size: ${theme("fontSize.SecondaryDescription")};
`;