import styled from 'styled-components';
import { ifProp, theme } from "styled-tools";

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-size: ${theme('fontSize.title')}
`;