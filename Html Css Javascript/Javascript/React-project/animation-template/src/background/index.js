import React from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import beach from "../assets/image/beach.jpg";
import styled from "styled-components";

const First = styled.div` 
  width: 100%;
  height: 100%;
  background: wheat;
`;

const Second = styled.div`
  width: 100%;
  height: 100%;
  background: wheat;
`;

const Third = styled.div`
  width: 100%;
  height: 100%;
  background: wheat;
`;

const Fourth = styled.div`
  width: 100%;
  height: 100%;
  background: wheat;
`;

class Home extends React.Component {
  render() {
    return (
      <>
        <Parallax ref={ref => (this.parallax = ref)} pages={4}>
          <ParallaxLayer
            offset={0}
            speed={0.5}
            onClick={() => this.parallax.scrollTo(1)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <First>
              사이버 보안학과에 오신 것을 환영합니다.
            </First>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.5}
            onClick={() => this.parallax.scrollTo(2)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Second>
              <h1>사이버 보안학과 인재상</h1>
              <div>끊임없이 탐구하는 능력</div>
              <div>스스로 학습하는 능력</div>
            </Second>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={0.5}
            onClick={() => this.parallax.scrollTo(3)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Third>
              <h1>모집 요강</h1>
              <h2>사이버 보안학과에 오기 위해서는?</h2>
            </Third>
          </ParallaxLayer>

          <ParallaxLayer
            offset={3}
            speed={-0}
            onClick={() => this.parallax.scrollTo(0)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Fourth>
              <h1>동아리실 및 랩실</h1>
              <h2>동아리 및 랩실의 활동은 활발합니다.</h2>
            </Fourth>
          </ParallaxLayer>
        </Parallax>

      </>
    )
  }
}

export default Home;
