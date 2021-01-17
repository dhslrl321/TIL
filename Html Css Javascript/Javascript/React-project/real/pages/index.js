import Navbar from "../components/modules/Navbar";
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

export default function Home() {
  return (
    <>
      <Navbar toggle={false} />
      <Container>
        Hello
      </Container>
    </>
  )
}
