import styled from "styled-components";
import {
  TITLE_FONT_SIZE,
  PARAGRAPH_FONT_SIZE,
  SECTION_HEIGHT,
  SECTION_WIDTH,
} from "common/StylesCommon";
import {
  FADE_IN_LEFT,
  FADE_IN_RIGHT,
  FADE_OUT,
  TRACKING_IN_CONTRACT,
} from "common/AnimationsCommon";
export const Container = styled.section`
  width: ${SECTION_WIDTH};
  height: ${SECTION_HEIGHT};
  background: linear-gradient(180deg, #191919 0%, #000 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${TITLE_FONT_SIZE};
  margin: 15px;
`;

export const Paragraph = styled.h2`
  font-size: ${PARAGRAPH_FONT_SIZE};
  margin: 15px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopImage = styled.div`
  width: 210px;
  height: 120px;
  background: gray;
  border-radius: 15px;
  margin: 5px;
`;

export const BottomImage = styled.div`
  width: 100px;
  height: 200px;
  background: white;
  margin: 5px;
  background: gray;
  border-radius: 15px;
`;

export const TopWrap = styled.div``;
export const BottomWrap = styled.div`
  display: flex;
`;

export const ImageComponents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
