import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  height: 100px;
  background: wheat;
  border-radius: 2px;
  font-size: 2rem;
`;
export default function Home() {
  return (
    <Container>
      <Button>로그인을 하려면 클릭하세요</Button>
      <Button>로그인을 하려면 클릭하세요</Button>

    </Container>
  )
}
