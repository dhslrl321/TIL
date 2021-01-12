import React from 'react'
import * as S from "./styles";
import Title from "../../atoms/Title";
import LectureCard from "../LectureCard";
const LectureGroup = ({ data }) => {
  return (
    <S.Container>
      <Title styleType="SubTitle">{data.lectureTitle}</Title>

      {data.lectures.map(lecture => (
        <S.LectureWrap>
          <LectureCard data={lecture} />
        </S.LectureWrap>
      ))}

    </S.Container>
  )
}

export default LectureGroup
