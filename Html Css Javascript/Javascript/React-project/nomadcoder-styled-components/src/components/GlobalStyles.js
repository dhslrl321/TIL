import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 14px;
    background-color: white;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  input, button {
        background-color: transparent;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family:'Maven Pro', sans-serif;
  }
`

export default GlobalStyles;