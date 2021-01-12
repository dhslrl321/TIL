import React, { Component } from "react";
import Image from ".";
export default {
  title: "Atoms / Image",
  component: Image
}

const Template = (args) => <Image {...args} />

export const Picture = Template.bind({})
Picture.args = {
  styleType: "Picture",
  src: "/favicon.ico"
}

export const Icon = Template.bind({})
Icon.args = {
  styleType: "Icon",
  src: "/c_icon.svg"
}