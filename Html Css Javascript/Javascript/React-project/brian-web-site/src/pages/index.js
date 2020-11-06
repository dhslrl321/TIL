import React, { useState } from 'react';
import Sidebar from "../components/Sidebar/index";
import Navbar from "../components/Navbar/index";
import TopSection from '../components/TopSection';

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <TopSection />
    </>
  )
}

export default Home;
