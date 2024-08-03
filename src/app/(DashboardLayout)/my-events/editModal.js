import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const EditModal = ({ open, onClose, event, onSave }) => {
  const [formData, setFormData] = useState({
    ticketsSold: 0,
    unsoldTickets: 0,
    ticketRevenue: 0,
    totalSales: 0,
    foodSales: 0,
    beverageSales: 0
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ticketsSold: event.ticketsSold || 0,
        unsoldTickets: event.unsoldTickets || 0,
        ticketRevenue: event.ticketRevenue || 0,
        totalSales: event.totalSales || 0,
        foodSales: event.foodSales || 0,
        beverageSales: event.beverageSales || 0
      });
    }
  }, [event]);

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: parseFloat(e.target.value) || 0
    });
  };

  const handleSave = () => {
    const updatedEvent = {
      ...event,
      ...formData,
      ticketInfo: {
        ticketsSold: formData.ticketsSold,
        unsoldTickets: formData.unsoldTickets,
        ticketRevenue: formData.ticketRevenue
      }
    };
    onSave(updatedEvent);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Event Details</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Event Name"
            value={event?.name || ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bands/Artists"
            value={event?.bookings?.[0]?.artistName || ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Venue"
            value={event?.venue?.name || ''}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Tickets Information</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Tickets Sold"
            type="number"
            value={formData.ticketsSold}
            onChange={handleChange('ticketsSold')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Unsold Tickets"
            type="number"
            value={formData.unsoldTickets}
            onChange={handleChange('unsoldTickets')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ticket Revenue"
            type="number"
            value={formData.ticketRevenue}
            onChange={handleChange('ticketRevenue')}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Sales Information</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Total Sales"
            type="number"
            value={formData.totalSales}
            onChange={handleChange('totalSales')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Food Sales"
            type="number"
            value={formData.foodSales}
            onChange={handleChange('foodSales')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Beverage Sales"
            type="number"
            value={formData.beverageSales}
            onChange={handleChange('beverageSales')}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
