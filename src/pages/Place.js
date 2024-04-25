import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTheme, Grid, Container } from '@mui/material';
import Iconify from '../components/iconify';
import { SearchItemWidgets } from '../sections/@dashboard/search';
import { OpinionItemWidgets } from '../sections/@dashboard/place';

export default function PlacePage() {
  const theme = useTheme();
  const location = useLocation();
  const place = location.state.place;
  const [opinions, setOpinions] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

    useEffect(() => {
      fetch(`http://localhost:8080/dashboard/opinion/place/${place.id}`, { headers })
        .then(response => response.json())
        .then(data => {
            setOpinions(data);
            console.log(data);
        });
    }, []);

  return (
    <>
      <Helmet>
        <title>{place ? `${place.name} | JorgX` : 'JorgX'}</title>
      </Helmet>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <SearchItemWidgets place={place} showButton={false}/>
          </Grid>
          <Grid item xs={8}>
            {opinions.map(opinion => (
              <OpinionItemWidgets key={opinion.id} opinion={opinion} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}