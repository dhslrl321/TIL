import React from "react";
import { ThemeProvider } from 'styled-components';
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import theme from "./theme";
import Reset from "./reset";

export const decorators = [
  (Story) => (
    <>
      <Reset />
      <ThemeProvider theme={theme}>

        <Story />
      </ThemeProvider>
    </>
  ),
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
}