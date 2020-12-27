export const ZOOM_IN = `
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
  }
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-name: zoomIn;
`;

export const FADE_OUT = `

@keyframes fadeOut {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-name: fadeOut
`;

export const FADE_IN_LEFT = `
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: scale3d(1, 1, 1) translate3d(-1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.55, .055, .675, .19)
    }
    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, .885, .32, 1)
    }
  }
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-name: fadeInLeft
`;

export const FADE_IN_RIGHT = `
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: scale3d(-1, 1, 1) translate3d(-1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.55, .055, .675, .19)
    }
    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(1px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, .885, .32, 1)
    }
  }
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-name: fadeInRight
`;

export const TRACING_IN = `
@keyframes tracking-in-expand-fwd-top {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px) translateY(-500px);
            transform: translateZ(-700px) translateY(-500px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
-webkit-animation: tracking-in-expand-fwd-top 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
animation: tracking-in-expand-fwd-top 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
`;

export const TRACKING_IN_CONTRACT = `

  @-webkit-keyframes tracking-in-contract-bck-top {
    0% {
      letter-spacing: 1em;
      -webkit-transform: translateZ(400px) translateY(-300px);
              transform: translateZ(400px) translateY(-300px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
              transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  @keyframes tracking-in-contract-bck-top {
    0% {
      letter-spacing: 1em;
      -webkit-transform: translateZ(400px) translateY(-300px);
              transform: translateZ(400px) translateY(-300px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
              transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }

  -webkit-animation: tracking-in-contract-bck-top 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-contract-bck-top 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  
`;

export const TRACKING_IN_EXPAND = ``;