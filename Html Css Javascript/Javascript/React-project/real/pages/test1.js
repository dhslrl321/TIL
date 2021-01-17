import React from 'react'
import Navbar from "../components/modules/Navbar";
import Section1 from "../components/sections/Test1";
const test1 = () => {
  return (
    <div>
      <Navbar toggle={false} />
      <Section1 id="section1">Section01</Section1>
      <Section1 id="section2">Section02</Section1>
      <Section1 id="section3">Section03</Section1>
    </div>
  )
}

export default test1
