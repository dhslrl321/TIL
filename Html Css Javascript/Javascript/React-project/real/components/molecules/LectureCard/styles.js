import styled from "styled-components";
import { theme } from 'styled-tools';
import { down } from "styled-breakpoints";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  height: 70px;
  background: ${theme("palettes.cardBg")};
  border-radius: 10px;
  
  ${down("md")} {
    width: 100%;
  }
  ${down("sm")} {
    width: 100%;
  }
`;

export const IconColumn = styled.div`
  ${theme("shortcuts.flexCenter")};
  margin-left: 20px;

  ${down("sm")} {
    margin-left: 15px;
  }
`;

export const TextColumn = styled.div`
  ${theme("shortcuts.flexCenterColumn")};
  align-items: flex-start;
  margin-left: 10px;
  ${down("sm")} {
    margin-left: 10px; 
  }

  ${down("md")} {
    
  }
  
  span:first-child {
    margin-bottom: 15px;
    font-weight: bolder;
    ${down("md")} {
      width: 200px;
    }
    ${down("sm")} {
      width: 100%;
      margin-bottom: 5px;
    }
  }
  p:nth-child(2){
    width: 300px;
    ${down("md")} {
      margin-right: 5px;
      width: 180px;
    }
    ${down("sm")} {
      padding-right: 5px;
      width: 190px;
    }
  }
`