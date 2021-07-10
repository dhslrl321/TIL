import React from 'react';
import Label from '.';

export default {
  title: "Atoms / Label",
  component: Label
}

const Template = (args) => <Label {...args} />

export const FirstLabel = Template.bind({});
FirstLabel.args = {
  styleType: "FirstLabel",
  children: "첫 번째 라벨",
}

export const SecondLabel = Template.bind({});
SecondLabel.args = {
  styleType: "SecondLabel",
  children: "두 번째 라벨",
}

export const ThirdLabel = Template.bind({});
ThirdLabel.args = {
  styleType: "ThirdLabel",
  children: "세 번째 라벨",
}

export const FourthLabel = Template.bind({});
FourthLabel.args = {
  styleType: "FourthLabel",
  children: "네 번째 라벨",
}
