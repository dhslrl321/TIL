import styled from "styled-components";
import { theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconColumn = styled.div`
  ${theme("shortcuts.flexCenter")};
`;

export const TextColumn = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
`