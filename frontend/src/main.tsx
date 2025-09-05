import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { DefaultStyling } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DefaultStyling />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
