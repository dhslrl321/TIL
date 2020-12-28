import styled from "styled-components";
import {
  SECTION_HEIGHT,
  SECTION_WIDTH,
  TITLE_FONT_SIZE,
  SUBTITLE_FONT_SIZE,
} from "common/StylesCommon";
export const Container = styled.div`
  width: ${SECTION_WIDTH};
  height: ${SECTION_HEIGHT};
  background: linear-gradient(180deg, #000 0%, #191919 100%);
  color: white;
`;

export const HeroTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: ${TITLE_FONT_SIZE};
`;
export const Subtitle = styled.h2`
  font-size: ${SUBTITLE_FONT_SIZE};
`;
