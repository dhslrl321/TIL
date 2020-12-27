import React from "react";
import { Container, ChatBox, ChatBallon } from "./styles";
import useScrollFadeIn from "hooks/useScrollFadeIn";
const ValueSection = () => {
  const animatedItem = {
    0: useScrollFadeIn("UP", 1, 0),
    1: useScrollFadeIn("UP", 1, 0.2),
    2: useScrollFadeIn("UP", 1, 0.4),
  };

  return (
    <Container>
      <ChatBox>
        <ChatBallon {...animatedItem[0]}>asdf</ChatBallon>
        <ChatBallon {...animatedItem[1]}>asdf</ChatBallon>
        <ChatBallon {...animatedItem[2]}>asdf</ChatBallon>
      </ChatBox>
    </Container>
  );
};

export default ValueSection;
