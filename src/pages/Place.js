import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTheme, Grid, Container, TextField } from '@mui/material';
import Iconify from '../components/iconify';
import { SearchItemWidgets } from '../sections/@dashboard/search';
import { OpinionItemWidgets, FloatingActionButtonsSave } from '../sections/@dashboard/place';

export default function PlacePage() {
  const theme = useTheme();
  const location = useLocation();
  const place = location.state.place;
  const [opinions, setOpinions] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');

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
  }, [place.id]);

  const handleOpinionChange = (event) => {
    setNewOpinion(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>{place ? `${place.name} | JorgX` : 'JorgX'}</title>
      </Helmet>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <SearchItemWidgets place={place} showButton={false} />
            <TextField
              label="Twoja opinia"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newOpinion}
              onChange={handleOpinionChange}
            />
            <FloatingActionButtonsSave />
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
