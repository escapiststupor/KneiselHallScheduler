import React from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navigation from './Navigation';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
  }
`

const AppRouter = () => (
  <ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
  <React.Fragment>
    <Navigation />
    <GlobalStyle />
  </React.Fragment>
</ThemeProvider>
);

export default AppRouter;