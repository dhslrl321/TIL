import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

const defaultStyle = css`
  width: 100px;
`;

export const Picture = styled.img`
  ${defaultStyle}
  width: 120px;
  border-radius: 60px;
  background: powderblue;
`;

export const Icon = styled.img`
${defaultStyle}
  width: 50%;
  height: auto;
`;