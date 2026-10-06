import React, { useContext, useRef, useState } from 'react';
import { 
  Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Box, Alert, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestoreApp } from '../../config/firebase';

export const AddAuction = () => {
  const [open, setOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [error, setError] = useState('');

  const { currentUser } = useContext(AuthContext);

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImageUrl = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
    setSubmit(false);
  };

  const submitAuction = async (e) => {
    e.preventDefault();
    setError('');

    if (!itemImageUrl.current.value) {
      return setError('Please provide an image URL');
    }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + parseInt(itemDuration.current.value)
    );

    const newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: parseInt(startPrice.current.value),
      duration: dueDate,
      imgUrl: itemImageUrl.current.value,
      createdAt: serverTimestamp(),
    };

    setSubmit(true);
    try {
      await addDoc(collection(firestoreApp, 'auctions'), newAuction);
      handleClose();
    } catch (err) {
      setError(err.message);
      setSubmit(false);
    }
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ borderRadius: 2, px: 4, py: 1.5 }}
      >
        Create Auction
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create a new Auction</DialogTitle>
        <Box component="form" onSubmit={submitAuction}>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              margin="dense"
              label="Item Title"
              fullWidth
              variant="outlined"
              inputRef={itemTitle}
              required
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Item Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              inputRef={itemDesc}
              required
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                margin="dense"
                label="Starting Price (₹)"
                type="number"
                fullWidth
                variant="outlined"
                inputRef={startPrice}
                required
              />
              
              <TextField
                margin="dense"
                label="Duration (Hours)"
                type="number"
                fullWidth
                variant="outlined"
                inputRef={itemDuration}
                required
              />
            </Box>

            <TextField
              margin="dense"
              label="Image URL (e.g. https://example.com/image.jpg)"
              type="url"
              fullWidth
              variant="outlined"
              inputRef={itemImageUrl}
              required
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmit}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmit}>
              {isSubmit ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
