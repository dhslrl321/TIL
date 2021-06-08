import Curriculum from ".";
import { data } from "./data";

export default {
  title: "sections / Curriculum",
  component: Curriculum
}

const Template = (args) => <Curriculum {...args} />

export const Rendering = Template.bind({})
Rendering.args = {
  datas: data,
}