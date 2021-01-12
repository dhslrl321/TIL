import React from "react";
import SectionHeader from ".";

export default {
  title: "Modules / SectionHeader",
  component: SectionHeader
}

const data = {
  title: "커리큘럼",
  description: "정보보안전문가가 되기 위해 4년간 이런 것들을 배워요"
}

const Template = (args) => <SectionHeader {...args} />

export const RenderStory = Template.bind({});
RenderStory.args = {
  data
}