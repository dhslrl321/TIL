export const FADE_IN = `
  data-aos="fade-zoom-in"
  data-aos-anchor-placement="bottom-bottom"
`;

export const fadeInAnimation = (aos, duration) => {

  return {
    "data-aos": aos,
    "data-aos-duration": duration,
    "data-aos-anchor-placement": "top-center"
  }
}

export const fadeOutAnimation = () => {

}