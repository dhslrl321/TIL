import React, { useEffect } from "react";
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
import { FADE_IN, fadeInAnimation } from "common/AnimationsCommon";
import AOS from "aos";
import "aos/dist/aos.css";

const StrengthSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const a = {
    0: fadeInAnimation("fade-left", 1500, "bottom-bottom"),
    1: fadeInAnimation("fade-left", 1000, "bottom-bottom"),
    2: fadeInAnimation("fade-left", 500, "center-center"),
  };
  return (
    <Container>
      <TextWrapper>
        <Title>우리가 갖고있는 강점</Title>
        <Paragraph>여기에서는 실무형 인재들을 양성하기 위해</Paragraph>
        <Paragraph>다양한 활동을 하고 있습니다.</Paragraph>
      </TextWrapper>
      <ImageWrapper>
        <ImageComponents {...a[0]}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents {...a[1]}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents {...a[2]}>
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
