import styled from "styled-components";
//import { SECTION_HEIGHT, SECTION_WIDTH } from "../../common/CommonStyle";
import { SECTION_HEIGHT, SECTION_WIDTH } from "common/StylesCommon";
export const Container = styled.div`
  width: ${SECTION_WIDTH};
  height: ${SECTION_HEIGHT};
  background: linear-gradient(180deg, #000 0%, #191919 100%);
  color: white;
  font-size: 2rem;
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChatBallon = styled.div`
  width: 100px;
  height: 80px;
  background: wheat;
  color: black;
  text-align: center;
  margin: 10px;
`;
