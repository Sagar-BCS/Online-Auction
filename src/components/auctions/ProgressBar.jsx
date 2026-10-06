import React, { useEffect } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { Box, LinearProgress, Typography } from '@mui/material';

export const ProgressBar = ({ item, setItem }) => {
  const { progress, isCompleted } = useStorage(item);

  useEffect(() => {
    if (isCompleted) {
      setItem(null);
    }
  }, [isCompleted, setItem]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        {Math.round(progress)}%
      </Typography>
    </Box>
  );
};
