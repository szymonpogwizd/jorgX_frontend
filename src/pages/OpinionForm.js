import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import {
  Grid, Container, Typography, TextField, Box,
  FormControlLabel, Switch, FormControl, InputLabel,
  Select, MenuItem, Autocomplete
} from '@mui/material';
import { FloatingActionButtonsSave } from '../sections/@dashboard/opinionForm';

export default function Contact() {
  const [newOpinion, setNewOpinion] = useState('');
  const [isNewPlace, setIsNewPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const theme = useTheme();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/place", { headers })
      .then(response => response.json())
      .then(data => {
        setPlaces(data);
      })
      .catch(error => {
        console.error('Failed to load places:', error);
      });
  }, []);

  const handleOpinionChange = (event) => {
    setNewOpinion(event.target.value);
  };

  const toggleNewPlace = (event) => {
    setIsNewPlace(event.target.checked);
    if (event.target.checked) {
      setSelectedPlaceId(null);
    }
  };

  const handlePlaceChange = (event, newValue) => {
    setSelectedPlaceId(newValue ? newValue.id : null);
  };

  const customFilterOptions = (options, { inputValue }) => {
    const normalizedInput = inputValue.toLowerCase().trim();
    return options.filter(option =>
      `${option.name} ${option.street} ${option.city.name}`.toLowerCase().includes(normalizedInput) ||
      `${option.street} ${option.name} ${option.city.name}`.toLowerCase().includes(normalizedInput) ||
      `${option.city.name} ${option.name}`.toLowerCase().includes(normalizedInput)
    );
  };

  const disabledStyle = {
    bgcolor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.action.disabled,
    },
    ".MuiInputLabel-root": {
      color: theme.palette.text.disabled,
    },
  };

  return (
    <>
      <Helmet>
        <title>Dodaj opinię | JorgX</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dodaj opinię
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={isNewPlace} onChange={toggleNewPlace} />}
              label="Nowe miejsce"
              sx={{ mb: 2 }}
            />

            <Autocomplete
              disablePortal
              id="place-select"
              options={places}
              getOptionLabel={(option) => `${option.name} - ${option.city.name} - ${option.street}`}
              onChange={handlePlaceChange}
              sx={{ mb: 2, width: '100%', ...(!isNewPlace ? {} : disabledStyle) }}
              renderInput={(params) => <TextField {...params} label="Wybierz lub szukaj miejsca" />}
              disabled={isNewPlace}
            />

            <TextField
              label="Nazwa restauracji"
              variant="outlined"
              fullWidth
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <TextField
              label="Ulica"
              variant="outlined"
              fullWidth
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <TextField
              label="Godziny otwarcia"
              variant="outlined"
              fullWidth
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <Autocomplete
              freeSolo
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
              renderInput={(params) => (
                <TextField {...params} label="Wybierz lub dodaj miasto" variant="outlined" />
              )}
            />

            <TextField
              label="Twoja opinia"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={newOpinion}
              onChange={handleOpinionChange}
              sx={{ mb: 2 }}
            />

            <FloatingActionButtonsSave />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
