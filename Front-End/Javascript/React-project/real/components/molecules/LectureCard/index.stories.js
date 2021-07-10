import LectureCard from ".";
import Image from "../../atoms/Image";
import Label from "../../atoms/Label";
import Description from "../../atoms/Description";

const data = {
  id: 1,
  title: "C언어",
  description: "C언어는 프로그래밍 언어의 기초 입니다. 프로그래밍의 기초인 만큼 더욱 상세하게 2학기에 거쳐 학습합니다.",
  src: "/lecture/c_icon.svg"
}

export default {
  title: "Molecules / LectureCard",
  component: LectureCard,
  subcomponent: { Image, Label, Description }
}

export const Rendering = (args) => <LectureCard {...args} />
Rendering.args = {
  data
}
