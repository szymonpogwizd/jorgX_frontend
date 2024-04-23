import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import { SearchItemWidgets } from '../sections/@dashboard/search';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [places, setPlaces] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/place", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Szukaj | JorgX</title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {places.map((place) => (
            <Grid item xs={12} sm={6} md={3} key={place.id}>
              <SearchItemWidgets
                rating={place.rating.toString()}
                city={place.city.name}
                street={place.street}
                openingHours={place.openingHours}
                name={place.name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
