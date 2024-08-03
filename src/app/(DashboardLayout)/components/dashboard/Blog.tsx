
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Avatar
} from "@mui/material";
// import img1 from "public/images/products/s4.jpg";
// import img2 from "public/images/products/s5.jpg";
// import img3 from "public/images/products/s7.jpg";
// import img4 from "public/images/products/s11.jpg";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import DashboardCard from "../shared/DashboardCard";
import { useSelector } from 'react-redux';
import Image from "next/image";

const ecoCard = [
  {
    title: "Boat Headphone",
    subheader: "September 14, 2023",
    photo: '/images/products/s4.jpg',
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    subheader: "September 14, 2023",
    photo: '/images/products/s5.jpg',
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    subheader: "September 14, 2023",
    photo: '/images/products/s7.jpg',
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    subheader: "September 14, 2023",
    photo: '/images/products/s11.jpg',
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const Blog = () => {
  const artists = useSelector((state) => state.artists.artists);
  const artistsToShow = artists.slice(0, 4);
  const images = [

  ]

  return (
    <DashboardCard title="Featured Artists">

      <Grid container spacing={3}>
        {artistsToShow.map((artist) => (
          <Grid item xs={12} md={4} lg={3} key={artist.id}>
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
  );
};

export default Blog;
