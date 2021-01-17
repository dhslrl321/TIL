import styled from "styled-components";
import { theme } from 'styled-tools';

export const Root = styled.div`
  ${theme("shortcuts.flexCenter")};
`;
export const Container = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  width: 100%;
  max-width: 960px;
  /* max-width: 1100px; */
`;
export const LectureWrapper = styled.div`
  ${theme("shortcuts.flexCenter")};
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  margin: 50px 0;
  @media screen and (max-width: 768px){
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;
export const LectureWrap = styled.div`
  margin: 10px;
`;

export const TitleWrap = styled.div`
  position: absolute;
  top: -25px;
  left: 10px;
`;