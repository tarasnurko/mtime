import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { store } from './app/store'

const theme = createTheme()

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
