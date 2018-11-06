import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Navigation from './Navigation';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${props => props.theme.fontFamily};
    background-color: #fafafa;
    margin: 0;
    body {
      margin: 0;
    }
  }
`;

const App = () => (
  <ThemeProvider theme={{ fontFamily: 'arial' }}>
    <React.Fragment>
      <Navigation />
      <GlobalStyle />
    </React.Fragment>
  </ThemeProvider>
);

export default App;
