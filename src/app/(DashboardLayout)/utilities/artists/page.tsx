'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import {
  Typography, Grid, CardContent,
  Rating,
  Tooltip,
  Fab,
  Avatar
} from '@mui/material';
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { useDispatch, useSelector } from 'react-redux';
import ArtistsApiServices from '@/services/artists-api-services';
import { setArtists } from '@/store/slices/artistSlice';

const ArtistsPage = () => {
  const artists = useSelector((state) => state.artists.artists);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (artists.length === 0) {
      Promise.all([
        ArtistsApiServices.getAllArtists(),
      ])
        .then(([artistsData]) => {
          dispatch(setArtists(artistsData));
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [artists.length, dispatch]);

  return (
    <PageContainer title="Artists" description="this is Artists">
      <DashboardCard title="Artists">

        <Grid container spacing={3}>
          {artists.map((artist, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <BlankCard>
                <Typography component={Link} href="/">
                  <Avatar
                    src={artist.image_url} variant="square"
                    sx={{
                      height: 250,
                      width: '100%',
                    }}

                  />
                </Typography>
                <Tooltip title="Book Event">
                  <Fab
                    size="small"
                    color="primary"
                    sx={{ bottom: "75px", right: "15px", position: "absolute" }}
                  >
                    <IconBasket size="16" />
                  </Fab>
                </Tooltip>
                <CardContent sx={{ p: 3, pt: 2 }}>
                  <Typography variant="h6">{artist.name}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={1}
                  >
                    <Stack direction="row" alignItems="center">
                      <Typography variant="h6">{artist.genre}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default ArtistsPage;
