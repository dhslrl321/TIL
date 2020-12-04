import "./App.css";
import styled from "styled-components";
import Bg from "./bg.png";

const Background = styled.div`
  height: 100vh;
  background: gray;
  display: flex;
  flex-direction: column;
`;

const BgImage = styled.img`
  width: 100%;
  height: 100%;
`;
const App = () => {
  return (
    <Background>
      <BgImage src={Bg}></BgImage>
    </Background>
  );
};

export default App;
