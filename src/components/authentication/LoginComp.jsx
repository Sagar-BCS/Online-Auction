import React, { useContext, useRef, useState } from 'react';
import { 
  Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Alert, CircularProgress 
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

export const LoginComp = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const { login } = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      handleClose();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button color="inherit" variant="outlined" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            inputRef={emailRef}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            inputRef={passwordRef}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
