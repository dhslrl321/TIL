import React from "react";
import styled, { ThemeProvider } from "styled-components";
import media from "./media";

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={{ ...media }}>{media}</ThemeProvider>;
};

export default CustomThemeProvider;
