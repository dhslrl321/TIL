import React from "react";

import Title from ".";
export default {
  title: "Atoms / Title",
  component: Title,
}

const Template = (args) => <Title {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  content: "Primary Header",
}

export const Secondary = Template.bind({});
Secondary.args = {
  content: "Secandary Header",
}

export const Third = Template.bind({});
Third.args = {
  content: "Third Header",
}