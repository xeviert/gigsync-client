'use client';
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const SamplePage = () => {
  const [formData, setFormData] = useState({
    artistName: '',
    eventName: '',
    eventDate: '',
    location: 'New York City', // Pre-filled location
    venue: 'Madison Square Garden' // Pre-filled venue
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <PageContainer title="Create Event" description="Create event page">
      <DashboardCard title="Create Event">
        <Typography variant="h6" mb={3}>
          Fill out the form to create a new event
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Artist/Band Name"
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Venue"
                name="venue"
                value={formData.venue}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Create Event
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
