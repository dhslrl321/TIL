import React from 'react'
import Navbar from "../components/modules/Navbar";
import TestSection from "../components/sections/Test1";
const test1 = () => {
  return (
    <div>
      <Navbar toggle={false} />
      <TestSection name="section1">section 1</TestSection>
      <TestSection name="section2">section 2</TestSection>
      <TestSection name="section3">section 3</TestSection>
    </div>
  )
}

export default test1
