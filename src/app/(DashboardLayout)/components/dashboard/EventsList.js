import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import EventApiServices from '../../../../services/event-api-services';
import BookingsApiServices from '../../../../services/bookings-api-services';
import ArtistsApiServices from '../../../../services/artists-api-services';
import UsersApiServices from '../../../../services/users-api-services';
import { setArtists } from '../../../../store/slices/artistSlice';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
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

                dispatch(setArtists(artistsData)); // Dispatch artists to Redux

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
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <DashboardCard title="Events">
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
                        {events.map((event) => (
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
                                            backgroundColor: "primary",
                                            color: "primary",
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
    );
};

export default EventsList;
