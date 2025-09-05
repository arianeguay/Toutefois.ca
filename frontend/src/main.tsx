import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import theme, { DefaultStyling, Fonts } from './theme.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DefaultStyling />
        <Fonts />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
