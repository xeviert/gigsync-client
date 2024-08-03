'use client';
import React, { useEffect, useState } from 'react';
import EditModal from './editModal'
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import EventApiServices from '@/services/event-api-services';
import BookingsApiServices from '@/services/bookings-api-services';
import ArtistsApiServices from '@/services/artists-api-services';
import UsersApiServices from '@/services/users-api-services';

const Icons = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (events.length === 0) {
      Promise.all([
        EventApiServices.getAllEvents(),
        BookingsApiServices.getAllBookings(),
        ArtistsApiServices.getAllArtists(),
        UsersApiServices.getAllUsers(),
      ])
        .then(([eventsData, bookingsData, artistsData, usersData]) => {
          // Create a map of artists for easy lookup
          const artistsMap = artistsData.reduce((acc, artist) => {
            acc[artist.id] = artist.name;
            return acc;
          }, {});

          // Create a map of bookings grouped by event_id
          const bookingsMap = bookingsData.reduce((acc, booking) => {
            if (!acc[booking.event_id]) {
              acc[booking.event_id] = [];
            }
            acc[booking.event_id].push({
              artistName: artistsMap[booking.artist_id],
              ...booking,
            });
            return acc;
          }, {});

          // Create a map of users for easy lookup
          const usersMap = usersData.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});

          // Map through events and attach bookings and artist names and venue
          const structuredEvents = eventsData.map((event) => ({
            ...event,
            bookings: bookingsMap[event.id] || [],
            venue: usersMap[event.venue_id] || null, // Attach venue if it exists
          }));

          // Sort events by date
          const sortedEvents = structuredEvents.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setEvents(sortedEvents);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [events.length, dispatch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Filter events where event.venue.id matches the user's ID
  const filteredEvents = events.filter(event => event.venue && event.venue.id === user?.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < today; // Event happened before today
  });

  const upcomingEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today; // Event is today or in the future
  });

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleSaveChanges = (updatedEvent) => {
    // Update the event in your state or make an API call to save changes
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditModalOpen(false);
  };

  return (
    <PageContainer title="My Events" description="these are my past Events">
      <DashboardCard title="Past Events">
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Event Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Bands/Artists
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Venue
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {event.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {formatDate(event.date)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {event.bookings?.[0]?.artistName || ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      }}
                      size="small"
                      label={event.venue ? event.venue.name : ''}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit Event
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>

      <Box sx={{ mt: 4 }}>
        <DashboardCard title="Upcoming Events" >
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Event Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Bands/Artists
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Venue
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {event.name}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {formatDate(event.date)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {event.bookings?.[0]?.artistName || ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                        }}
                        size="small"
                        label={event.venue ? event.venue.name : ''}
                      ></Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DashboardCard>
      </Box>

      <EditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveChanges}
      />
    </PageContainer>
  );
};

export default Icons;
