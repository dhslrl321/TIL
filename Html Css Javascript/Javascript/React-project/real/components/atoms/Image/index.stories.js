import React from "react";
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
  src: "/lecture/c_icon.svg"
}