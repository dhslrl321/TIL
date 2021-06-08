import React from "react";
import * as S from "./styles";
import Title from "../../atoms/Title";
import Label from "../../atoms/Label";

const SectionHeader = ({ title, description }) => {

  return (
    <S.Container>
      <Title styleType="MainTitle">{title}</Title>
      <Label styleType="PrimaryDescription">{description}</Label>
    </S.Container>
  )
}

export default SectionHeader
