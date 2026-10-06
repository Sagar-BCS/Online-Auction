import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { AuctionCard } from './AuctionCard';
import { AddAuction } from './AddAuction';
import { Container, Grid, Typography, Alert, Box } from '@mui/material';

export const AuctionBody = () => {
  const { currentUser, globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore('auctions');

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        {currentUser && <AddAuction />}
        {globalMsg && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {globalMsg}
          </Alert>
        )}
        
        {docs && docs.length > 0 ? (
          <Grid container spacing={4}>
            {docs.map((doc) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
                <AuctionCard item={doc} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 5 }}>
            No auctions available right now. Be the first to start one!
          </Typography>
        )}
      </Container>
    </Box>
  );
};
