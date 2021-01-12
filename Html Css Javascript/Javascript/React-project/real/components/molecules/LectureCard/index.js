import React from 'react'
import * as S from "./styles";
import Image from '../../atoms/Image';
import Label from '../../atoms/Label';
import Description from '../../atoms/Description';

const LectureCard = ({ data }) => {
  const { title, description, src } = data;
  return (
    <S.Container>
      <S.IconColumn>
        <Image styleType="Icon" src={src} />
      </S.IconColumn>
      <S.TextColumn>
        <Label styleType="FirstLabel">{title}</Label>
        <Description styleType="SecondaryDescription">{description}</Description>
      </S.TextColumn>
    </S.Container>
  )
}

export default LectureCard
