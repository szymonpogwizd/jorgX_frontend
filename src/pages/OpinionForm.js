import React, { useState } from 'react';
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
  const theme = useTheme();

  const handleOpinionChange = (event) => {
    setNewOpinion(event.target.value);
  };

  const toggleNewPlace = (event) => {
    setIsNewPlace(event.target.checked);
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
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Switch checked={isNewPlace} onChange={toggleNewPlace} />}
              label="Nowe miejsce"
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2, ...(!isNewPlace ? {} : disabledStyle) }}>
              <InputLabel id="place-select-label">Wybierz miejsce</InputLabel>
              <Select
                labelId="place-select-label"
                id="place-select"
                label="Wybierz miejsce"
                disabled={isNewPlace}
              >
                <MenuItem value={10}>Miejsce 1</MenuItem>
              </Select>
            </FormControl>

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
