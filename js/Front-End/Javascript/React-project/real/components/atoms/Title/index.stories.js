import React from 'react';
import Title from ".";

export default {
  title: "Atoms / Title",
  component: Title
}

const Template = (args) => <Title {...args} />

export const MainTitle = Template.bind({});
MainTitle.args = {
  styleType: "MainTitle",
  children: "메인 타이틀",
}

export const SubTitle = Template.bind({});
SubTitle.args = {
  styleType: "SubTitle",
  children: "서브 타이틀",
}

