import React, { useState } from "react";
import { Container, HeroTitleContainer, Title, Subtitle } from "./styles";

const HeroSection = () => {
  return (
    <Container>
      <HeroTitleContainer>
        <Title>배재대학교</Title>
        <Subtitle>SW 공학부 정보보안학과</Subtitle>
      </HeroTitleContainer>
    </Container>
  );
};

export default HeroSection;
