import styled from "styled-components";
import { theme } from 'styled-tools';

export const Container = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  width: 100%;
`;
export const LectureWrapper = styled.div`
  ${theme("shortcuts.flexCenter")};
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
`;
export const LectureWrap = styled.div`
  margin: 10px;
`;

export const TitleWrap = styled.div`
  width: 100%;
`;