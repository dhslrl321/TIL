import styled from "styled-components";
import {
  SECTION_HEIGHT,
  SECTION_WIDTH,
  SUBTITLE_FONT_SIZE,
} from "common/StylesCommon";
import { TITLE_FONT_SIZE } from "common/mixins";
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
  ${TITLE_FONT_SIZE}
`;
export const Subtitle = styled.h2`
  font-size: ${SUBTITLE_FONT_SIZE};
`;
