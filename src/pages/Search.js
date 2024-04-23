import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TextField, useTheme, Grid, Container } from '@mui/material';
import Iconify from '../components/iconify';
// sections
import { SearchItemWidgets } from '../sections/@dashboard/search';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/place", { headers })
      .then(response => response.json())
      .then(data => {
        setPlaces(data);
        console.log(data);
      });
  }, []);

  const filteredPlaces = places.filter(place =>
    place.city.name.toLowerCase().includes(searchText.toLowerCase()) ||
    place.street.toLowerCase().includes(searchText.toLowerCase()) ||
    place.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Szukaj | JorgX</title>
      </Helmet>

      <Container maxWidth="xl">
        <TextField
          fullWidth
          label="Szukaj miejsca"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={3}>
          {filteredPlaces.map((place) => (
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
