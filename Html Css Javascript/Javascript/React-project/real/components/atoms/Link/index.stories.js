import React from "react";
import Link from ".";

export default {
  title: "atoms / Link",
  component: Link
}

const Template = (args) => <Link {...args} />

export const NextLinkRendering = Template.bind({});
NextLinkRendering.args = {
  styleType: "NextLink",
  href: "#",
  children: "Home"
}

export const AnchorRendering = Template.bind({});
AnchorRendering.args = {
  styleType: "Anchor",
  href: "#",
  children: "CTF"
}