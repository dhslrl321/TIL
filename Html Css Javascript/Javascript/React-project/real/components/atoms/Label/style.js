import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

const defaultStyle = css`
  
`;

export const FirstLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.FirstLabel")};
`;

export const SecondLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.SecondLabel")};
`;

export const ThirdLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.ThirdLabel")};
`;

export const FourthLabel = styled.span`
  ${defaultStyle};
  font-size: ${theme("fontSize.FourthLabel")};
`;