import React from 'react';
import { My } from ".";

export default {
  title: "Atoms / My",
  component: My,
}

const Template = (args) => <My {...args} />;

export const Title = Template.bind({});
Title.args = {
  title,
  children: "제목 입니다."
};

export const Subtitle = Template.bind({});
Subtitle.args = {
  subtitle,
  children: "부제목 입니다."
};

export const Paragraph = Template.bild({});
Paragraph.args = {
  paragraph,
  children: "문장입니다."
}