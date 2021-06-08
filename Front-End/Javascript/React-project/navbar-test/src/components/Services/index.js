import React from 'react'
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-2.svg";
import Icon3 from "../../images/svg-3.svg";

import {
  ServicesContainer, ServicesH1, ServicesH2,
  ServicesWrapper, ServicesCard, ServicesIcon,
  ServicesP
} from "./ServicesElements";
const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Reduce Expensens</ServicesH2>
          <ServicesP>We help your fees and increase your overall revenue.</ServicesP>
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Virtual Offices</ServicesH2>
          <ServicesP>You can access our platform online anywhere in the world.</ServicesP>
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Reduce Expensens</ServicesH2>
          <ServicesP>Unlock our special membership card that return 5% money</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services;
