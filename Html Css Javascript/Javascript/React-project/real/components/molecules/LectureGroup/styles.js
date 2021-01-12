import styled from "styled-components";
import { theme } from 'styled-tools';

export const Container = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  width: 100%;
  max-width: 1100px;
`;
export const LectureWrapper = styled.div`
  ${theme("shortcuts.flexCenter")};
  flex-direction: row;
  flex-wrap: wrap;
  
`;
export const LectureWrap = styled.div`
  margin: 10px;
`;

export const TitleWrap = styled.div`
  width: 100%;
`;