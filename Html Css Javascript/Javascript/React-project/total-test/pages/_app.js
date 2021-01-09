import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Reset from "common/reset"; // css global reset
import { ThemeProvider } from "styled-components"; // common theme
import theme from "common/theme";
export default class RootApp extends App {
  render() {
    const { Component, ...other } = this.props;
    return (
      <Container>
        <Reset />
        <Head>
          <title>Test</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...other} />
        </ThemeProvider>
      </Container >
    );
  }
}