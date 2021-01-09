const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  title: pixelToRem(40),
  subtitle: pixelToRem(30),
  plainText: pixelToRem(18),
}

const colors = {
  white: "#000000",
  gray: "#999999",
  blue: "#039231"
}

const shortcut = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `
};

const theme = {
  fontSizes,
  colors,
  shortcut
}


export default theme;