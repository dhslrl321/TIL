import React from 'react'
import * as S from "./styles";
import Image from 'components/atoms/Image';
import Label from 'components/atoms/Label';
import Description from 'components/atoms/Description';

const LectureCard = () => {
  return (
    <S.Container>
      <S.IconColumn>
        <Image styleType="Icon" src="/c_icon.svg" />
      </S.IconColumn>
      <S.TextColumn>
        <Label styleType="FirstLabel">asdf</Label>
        <Description styleType="PrimaryDescription">asdf</Description>
      </S.TextColumn>
    </S.Container>
  )
}

export default LectureCard
