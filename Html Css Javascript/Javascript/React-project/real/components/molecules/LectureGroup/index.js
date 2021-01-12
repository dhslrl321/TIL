import React from 'react'
import * as S from "./styles";
import Title from "../../atoms/Title";
import LectureCard from "../LectureCard";
const LectureGroup = ({ data }) => {
  return (
    <S.Container>
      <S.TitleWrap>
        <Title styleType="SubTitle">{data.lectureTitle}</Title>
      </S.TitleWrap>
      <S.LectureWrapper>
        {data.lectures.map(lecture => (
          <S.LectureWrap>
            <LectureCard id={lecture.id} data={lecture} />
          </S.LectureWrap>
        ))}
      </S.LectureWrapper>
    </S.Container>
  )
}

export default LectureGroup
