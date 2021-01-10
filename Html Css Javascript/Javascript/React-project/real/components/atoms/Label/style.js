import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

const LabelStyle = css`
  
`;

export const FirstLabel = styled.span`
  ${LabelStyle};
  font-size: ${theme("fontSize.FirstLabel")};
`;

export const SecondLabel = styled.span`
  ${LabelStyle};
  font-size: ${theme("fontSize.SecondLabel")};
`;

export const ThirdLabel = styled.span`
  ${LabelStyle};
  font-size: ${theme("fontSize.ThirdLabel")};
`;

export const FourthLabel = styled.span`
  ${LabelStyle};
  font-size: ${theme("fontSize.FourthLabel")};
`;