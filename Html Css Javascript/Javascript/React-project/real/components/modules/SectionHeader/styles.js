import styled from "styled-components";
import { theme } from 'styled-tools';
export const Container = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  h1:first-child {
    margin-bottom: 20px;
  }
`;