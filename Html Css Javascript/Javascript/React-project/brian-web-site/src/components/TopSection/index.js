import React from 'react'
import Video from "../../videos/piano.mp4";
import {
  TopContainer, TopBg, VideoBg,
  TopH1, TopP, TopContent
} from "./styles";
const TopSection = () => {
  return (
    <TopContainer>
      <TopBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </TopBg>
      <TopContent>
        <TopH1>차원이 다른 음악 연습실</TopH1>
        <TopP>단언컨데, 당신이 경험해보지 못한 차원이 다른 연습실입니다.</TopP>
      </TopContent>
    </TopContainer>
  )
}

export default TopSection;
