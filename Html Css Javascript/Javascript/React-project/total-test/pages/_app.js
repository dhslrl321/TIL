import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Reset from "common/reset"; // css global reset
import { ThemeProvider } from "styled-components"; // common theme
import theme from "common/theme";
import defaultTheme from "common/themes";
export default class RootApp extends App {
  render() {
    const { Component, ...other } = this.props;
    return (
      <>
        <Reset />
        <Head>
          <title>Test</title>
        </Head>
        <ThemeProvider theme={defaultTheme}>
          <Component {...other} />
        </ThemeProvider>
      </ >
    );
  }
}