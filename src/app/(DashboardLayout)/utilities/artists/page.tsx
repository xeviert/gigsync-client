'use client';
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
import { useSelector } from 'react-redux';

const ArtistsPage = () => {
  const artists = useSelector((state) => state.artists.artists);

  return (
    <PageContainer title="Artists" description="this is Artists">
      <DashboardCard title="Artists">

        <Grid container spacing={3}>
          {artists.map((artist, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <BlankCard>
                <Typography component={Link} href="/">
                  <Avatar
                    src='/images/products/s4.jpg' variant="square"
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
