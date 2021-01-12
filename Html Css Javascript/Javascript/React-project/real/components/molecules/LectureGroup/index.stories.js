import React from "react";
import LectureGroup from ".";

export default {
  title: "molecules / LectureGroup",
  component: LectureGroup
}

const data = {
  lectureTitle: "프로그래밍 언어",
  lectures: [
    { id: 1, title: "C언어", description: "C언어는 프로그래밍 언어의 기초 입니다.", src: "/c_icon.svg" }
  ]
}

const Template = (args) => <LectureGroup {...args} />

export const Rendering = Template.bind({});
Rendering.args = {

}