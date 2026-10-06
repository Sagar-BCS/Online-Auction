import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { NavComp } from './components/authentication/NavComp';
import { AuctionBody } from './components/auctions/Body';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NavComp />
        <AuctionBody />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
