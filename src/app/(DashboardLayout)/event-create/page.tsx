'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Grid,
  Box
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import EventApiServices from '@/services/event-api-services';
import BookingsApiServices from '@/services/bookings-api-services';
import ArtistsApiServices from '@/services/artists-api-services';
import { setArtists } from '@/store/slices/artistSlice';

const SamplePage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const artists = useSelector((state) => state.artists.artists || []);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    selectedArtist: '',
    artistId: '',
    eventName: '',
    eventDate: '',
    location: user?.city || '',
    venue: user?.name || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (artists.length === 0) {
      ArtistsApiServices.getAllArtists()
        .then((artistsData) => {
          dispatch(setArtists(artistsData));
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [artists.length, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedArtist') {
      // Parse the JSON string to get id and name
      const artist = JSON.parse(value);
      setFormData({
        ...formData,
        selectedArtist: value, // Save the stringified value for matching
        artistId: artist.id, // Maintain separate fields if needed for other purposes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.eventName || !formData.eventDate || !formData.artistId) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const venue_id = user.id;
      const name = formData.eventName;
      const date = formData.eventDate;

      const eventResponse = await EventApiServices.createEvent({ venue_id, name, date });
      if (!eventResponse || !eventResponse.id) {
        throw new Error('Failed to retrieve event ID');
      }
      debugger

      const event_id = eventResponse.id;
      const status = 'pending';
      const artist_id = formData.artistId;

      const bookingResponse = await BookingsApiServices.createBooking({ event_id, artist_id, status });
      if (!bookingResponse) {
        throw new Error('Failed to create booking');
      }
      debugger

      console.log('Event created successfully:', eventResponse);
      console.log('Booking created successfully:', bookingResponse);

      setFormData({
        selectedArtist: '',
        artistId: '',
        eventName: '',
        eventDate: '',
        location: user.city,
        venue: user.name,
      });
    } catch (err) {
      setError('Failed to create event. Please try again.');
      console.error('Error creating event:', err);
    } finally {
      setLoading(false);
    }
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
              <Select
                fullWidth
                name="selectedArtist"
                value={formData.selectedArtist}
                onChange={handleChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Select Artist/Band Name
                </MenuItem>
                {artists.map((artist) => (
                  <MenuItem key={artist.id} value={JSON.stringify({ id: artist.id, name: artist.name })}>
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
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
              {error && <Typography color="error">{error}</Typography>}
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Create Event'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
