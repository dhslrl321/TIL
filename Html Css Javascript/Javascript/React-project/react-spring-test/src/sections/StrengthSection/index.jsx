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

const StrengthSection = ({ scroll }) => {
  return (
    <Container>
      <TextWrapper scroll={scroll}>
        <Title>우리가 갖고있는 강점</Title>
        <Paragraph>
          배재대학교 사이버 보안학과에서는 실무형 인재들을 양성하기 위해
        </Paragraph>
        <Paragraph>다양한 활동을 하고 있습니다.</Paragraph>
      </TextWrapper>
      <ImageWrapper>
        <ImageComponents scroll={scroll}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents scroll={scroll}>
          <TopWrap>
            <TopImage />
          </TopWrap>
          <BottomWrap>
            <BottomImage />
            <BottomImage />
          </BottomWrap>
        </ImageComponents>
        <ImageComponents scroll={scroll}>
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
