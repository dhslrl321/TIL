import React from "react";
import LectureGroup from ".";

export default {
  title: "molecules / LectureGroup",
  component: LectureGroup
}

const data = {
  lectureTitle: "프로그래밍 언어",
  lectures: [
    { id: 1, title: "C언어", description: "C언어는 프로그래밍 언어의 기초 입니다.", src: "/lecture/c_icon.svg" },
    { id: 2, title: "Python", description: "Data 분석, Machine Learning, Deep Learning을 위한 정적 언어인 Python을 학습합니다.", src: "/lecture/python_icon.svg" },
    { id: 3, title: "Java", description: "Java 언어를 배우며 웹 서버 프로그래밍, 데스크톱 프로그래밍, 모바일 프로그래밍을 배웁니다.", src: "/lecture/java_icon.svg" },
    { id: 4, title: "Html / Css / Javascript", description: "웹을 지탱하는 3가지 언어를 학습하며 웹 페이지의 원리와 동작에 대해서 배웁니다", src: "/lecture/html_icon.svg" },
  ]
}

const Template = (args) => <LectureGroup {...args} />

export const Rendering = Template.bind({});
Rendering.args = {
  data
}