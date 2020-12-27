import React, { useState, useEffect } from "react";
import HeroSections from "sections/HeroSection";
import StrengthSection from "sections/StrengthSection";
import ValueSection from "sections/ValueSection";

const Home = () => {
  const [scroll, setScroll] = useState(window.scrollY);
  const navPosition = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", navPosition);
  }, [scroll]);
  console.log(window.innerHeight / scroll);
  return (
    <>
      {console.log(window.scrollY)}
      <HeroSections scroll={scroll} />
      <StrengthSection scroll={scroll} />
      <ValueSection />
    </>
  );
};

export default Home;
