import React from "react";

import Title from "./Title";

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