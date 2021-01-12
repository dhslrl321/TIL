import styled from "styled-components";
import { theme } from 'styled-tools';

export const Container = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  flex-wrap: wrap;
`;

export const LectureWrap = styled.div`
  margin: 10px;
`;