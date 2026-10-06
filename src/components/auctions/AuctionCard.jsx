import React, { useContext, useState, useRef } from 'react';
import Countdown from 'react-countdown';
import { 
  Card, CardMedia, CardContent, CardActions, Typography, Button, 
  Box, Chip, Divider, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Slider, Stack, ButtonGroup
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  const { item, owner, bidAuction, endAuction, updateAuctionImage } = props;
  
  const [openEdit, setOpenEdit] = useState(false);
  const newImgRef = useRef();

  const [openBid, setOpenBid] = useState(false);
  const [addedBid, setAddedBid] = useState(10); // default +10
  const [sliderPct, setSliderPct] = useState(0);

  const handleEditSubmit = () => {
    if (newImgRef.current && newImgRef.current.value) {
      updateAuctionImage(item.id, newImgRef.current.value);
    }
    setOpenEdit(false);
  };

  const handleFixedBid = (amount) => {
    setAddedBid(amount);
    setSliderPct(0); // reset slider if fixed is chosen
  };

  const handleSliderChange = (event, newValue) => {
    setSliderPct(newValue);
    const calculatedAddition = Math.round(item.curPrice * (newValue / 100));
    setAddedBid(calculatedAddition || 1); // minimum 1 if percentage is too small
  };

  const handleBidSubmit = () => {
    const newPrice = item.curPrice + addedBid;
    bidAuction(item.id, newPrice);
    setOpenBid(false);
    setAddedBid(10);
    setSliderPct(0);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 6 } }}>
      <CardMedia
        component="img"
        height="240"
        image={item.imgUrl}
        alt={item.title}
        sx={{ objectFit: 'contain', bgcolor: 'grey.100', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
          {item.title}
        </Typography>
        <Chip 
          label={`${hours}h : ${minutes}m : ${seconds}s`} 
          color="error" 
          variant="outlined"
          sx={{ mb: 2, fontWeight: 'bold' }} 
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
          {item.desc}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="medium">Seller:</Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '150px' }}>
            {item.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" fontWeight="medium">Highest Bidder:</Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '150px' }}>
            {item.curWinner || 'None'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!owner ? (
            <Button size="small" variant="contained" onClick={() => setOpenBid(true)}>
              Bid
            </Button>
          ) : owner.email === item.email ? (
            <>
              <Button size="small" variant="outlined" color="primary" onClick={() => setOpenEdit(true)}>
                Edit Image
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => endAuction(item.id)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button size="small" variant="contained" color="primary" onClick={() => setOpenBid(true)}>
              Bid
            </Button>
          )}
        </Box>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{item.curPrice}
        </Typography>
      </CardActions>

      {/* Edit Image Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Image Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Image URL"
            type="url"
            fullWidth
            variant="outlined"
            inputRef={newImgRef}
            defaultValue={item.imgUrl}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bid Options Dialog */}
      <Dialog open={openBid} onClose={() => setOpenBid(false)} fullWidth maxWidth="xs">
        <DialogTitle>Place a Bid</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Current Price: <strong>₹{item.curPrice}</strong>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Quick Add:
          </Typography>
          <ButtonGroup variant="outlined" fullWidth sx={{ mb: 3 }}>
            <Button onClick={() => handleFixedBid(10)} variant={addedBid === 10 && sliderPct === 0 ? 'contained' : 'outlined'}>+10</Button>
            <Button onClick={() => handleFixedBid(100)} variant={addedBid === 100 && sliderPct === 0 ? 'contained' : 'outlined'}>+100</Button>
            <Button onClick={() => handleFixedBid(1000)} variant={addedBid === 1000 && sliderPct === 0 ? 'contained' : 'outlined'}>+1k</Button>
            <Button onClick={() => handleFixedBid(10000)} variant={addedBid === 10000 && sliderPct === 0 ? 'contained' : 'outlined'}>+10k</Button>
          </ButtonGroup>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Or increase by percentage: {sliderPct}% (₹{Math.round(item.curPrice * (sliderPct / 100))})
          </Typography>
          <Slider
            value={sliderPct}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={100}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" color="primary" align="center">
            Your Bid: ₹{item.curPrice + addedBid}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBid(false)}>Cancel</Button>
          <Button onClick={handleBidSubmit} variant="contained" color="primary">
            Confirm Bid
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
  );
};

export const AuctionCard = ({ item }) => {
  const expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction, updateAuctionImage } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={(props) => <Renderer {...props} props={{...props, item, owner: currentUser, bidAuction, endAuction, updateAuctionImage}} />}
    />
  );
};
