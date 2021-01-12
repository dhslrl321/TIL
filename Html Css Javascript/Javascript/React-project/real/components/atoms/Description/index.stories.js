import React from "react";
import Description from ".";

export default {
  title: "Atoms / Description",
  component: Description
}

const Template = (args) => <Description {...args} />

export const PrimaryDescription = Template.bind({})
PrimaryDescription.args = {
  styleType: "PrimaryDescription",
  children: "첫 번째 Desc"
}
export const SecondaryDescription = Template.bind({})
SecondaryDescription.args = {
  styleType: "SecondaryDescription",
  children: "두 번째 Desc"
}
