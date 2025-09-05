import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { DefaultStyling } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <DefaultStyling />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
