import { css } from "styled-components";

const sizes = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  tesktop: 2560,
};

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
