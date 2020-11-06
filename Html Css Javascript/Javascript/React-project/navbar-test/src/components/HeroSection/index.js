import React, { useState } from 'react';
import Video from "../../videos/video.mp4";
import {
  HeroContainer, VideoBg, HeroBg, HeroH1,
  HeroContent, HeroBtnWrapper, HeroP,
  ArrowForward, ArrowRight
} from "./HeroElements";
import { Button } from "../ButtonElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  }
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Virtual Banking Made Easy</HeroH1>
        <HeroP>
          Sing Up for a new account today and receive $250 in credit towards your next payment
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to="sizeup"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true">
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
