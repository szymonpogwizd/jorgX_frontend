import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [numOpinions, setNumOpinions] = useState(0);
  const [numPlaces, setNumPlaces] = useState(0);
  const [numCities, setNumCities] = useState(0);
  const [numUsers, setNumUsers] = useState(0);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/users", { headers })
      .then((response) => response.json())
      .then((data) => setNumUsers(data || "0"));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/opinions", { headers })
      .then((response) => response.json())
      .then((data) => setNumOpinions(data || "0"));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/places", { headers })
      .then((response) => response.json())
      .then((data) => setNumPlaces(data || "0"));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/cities", { headers })
      .then((response) => response.json())
      .then((data) => setNumCities(data || "0"));
  }, []);

  return (
    <>
      <Helmet>
        <title> Statystyki | JorgX </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Witaj ponownie {localStorage.getItem('email')}!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Opinie" total={numOpinions} icon={'ant-design:star'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Lokale" total={numPlaces} color="info" icon={'ant-design:shop'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Miasta" total={numCities} color="error" icon={'ant-design:bank'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Użytkownicy" total={numUsers} color="warning" icon={'ant-design:user-outlined'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
