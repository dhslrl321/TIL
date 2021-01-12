import LectureCard from ".";
import Image from "../../atoms/Image";
import Label from "../../atoms/Label";
import Description from "../../atoms/Description";

const data = {
  id: 1,
  title: "C언어",
  description: "C언어는 프로그래밍 언어의 기초 입니다.",
  src: "/c_icon.svg"
}

export default {
  title: "Molecules / LectureCard",
  component: LectureCard,
  subcomponent: { Image, Label, Description }
}

export const RenderStory = (args) => <LectureCard {...args} />
RenderStory.args = {
  data
}
