import React from "react";
import {
  Container,
  Title,
  Paragraph,
  TextWrapper,
  ImageWrapper,
  TopImage,
  BottomImage,
  TopWrap,
  BottomWrap,
  ImageComponents,
} from "./styles";
import useScrollFadeIn from "hooks/useScrollFadeIn";
import useScrollFadeOut from "hooks/useScrollFadeOut";

const StrengthSection = () => {
  const animatedItem = {
    0: useScrollFadeIn("down", 1, 0.1),
    1: useScrollFadeIn("up", 1, 0.3),
    2: useScrollFadeIn("up", 1, 0.4),
    3: useScrollFadeIn("up", 1, 0.5),
  };

  return (
    <Container>
      <TextWrapper {...animatedItem[0]}>
        <Title>우리가 갖고있는 강점</Title>
        <Paragraph>여기에서는 실무형 인재들을 양성하기 위해</Paragraph>
        <Paragraph>다양한 활동을 하고 있습니다.</Paragraph>
      </TextWrapper>
      <ImageWrapper>
        <ImageComponents {...animatedItem[1]}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents {...animatedItem[2]}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents {...animatedItem[3]}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
      </ImageWrapper>
    </Container>
  );
};

export default StrengthSection;
