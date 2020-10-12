import React from 'react';
import styled from 'styled-components';
import { Wifi2 } from "@styled-icons/boxicons-regular";
import { BatteryFull } from "@styled-icons/bootstrap";
import { RotateLock } from "@styled-icons/remix-fill";
import { Bolt } from "@styled-icons/boxicons-solid";
const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  width: 100%;
`;

const ItemBlock = styled.div`
  width: 33%;

  &:first-child {
    margin-right: 5px;
  }
  &:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  &:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const WifiIcon = styled(Wifi2)`
  width: 18px;
  height: 18px;
`;

const LockIcon = styled(RotateLock)`
  width: 18px;
  height: 18px;
`;

const BatteryIcon = styled(BatteryFull)`
  width: 18px;
  height: 18px;
`;

const BoltIcon = styled(Bolt)`
  width: 15px;
  height: 15px;
`;


const StatusBar = () => {
  return (
    <Container>
      <ItemBlock>
        <span>No Service</span>
        <WifiIcon />
      </ItemBlock>
      <ItemBlock>
        <span>18:43</span>
      </ItemBlock>
      <ItemBlock>
        <LockIcon />
        <span>100%</span>
        <BatteryIcon />
        <BoltIcon />
      </ItemBlock>
    </Container>
  );
}

export default StatusBar;