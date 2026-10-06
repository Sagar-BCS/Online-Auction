import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import GavelIcon from '@mui/icons-material/Gavel';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GavelIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            AUCTIONEER
          </Typography>

          <GavelIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AUCTIONEER
          </Typography>

          <Box sx={{ flexGrow: 0, display: 'flex', gap: 2, alignItems: 'center' }}>
            {currentUser ? (
              <>
                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Welcome, {currentUser.email}
                </Typography>
                <Button color="inherit" variant="outlined" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
