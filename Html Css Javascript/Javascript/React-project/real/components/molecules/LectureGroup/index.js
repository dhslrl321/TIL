import React from 'react'
import Title from "../../atoms/Title";

const LectureGroup = ({ data }) => {
  return (
    <div>
      <Title styleType="SubTitle">{data.lectureTitle}</Title>
      {data.lectures.map(lecture => (
        <LectureCard data={lecture} />
      ))}
    </div>
  )
}

export default LectureGroup
