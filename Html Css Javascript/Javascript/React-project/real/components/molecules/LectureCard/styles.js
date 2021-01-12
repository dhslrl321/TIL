import styled from "styled-components";
import { theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  height: 70px;
  background: ${theme("palettes.cardBg")};
  border-radius: 10px;
  box-shadow: 3px 3px 10px 3px #222222;
`;

export const IconColumn = styled.div`
  ${theme("shortcuts.flexCenter")};
  margin-left: 30px;
`;

export const TextColumn = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  align-items: flex-start;
  margin-left: 30px;
  span:first-child {
    margin-bottom: 15px;
    font-weight: bolder;
  }
  p:nth-child(2){
    width: 300px;
  }
`