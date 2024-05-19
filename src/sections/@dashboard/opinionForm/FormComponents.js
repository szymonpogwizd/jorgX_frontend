import React from 'react';
import { TextField, FormControlLabel, Switch, Autocomplete } from '@mui/material';

export function OpinionForm({ isNewPlace, toggleNewPlace, places, selectedPlace, setSelectedPlace, setSelectedPlaceId }) {
  return (
    <>
      <FormControlLabel
        control={<Switch checked={isNewPlace} onChange={toggleNewPlace} />}
        label="Nowe miejsce"
        sx={{ mb: 2 }}
      />
      <Autocomplete
        disablePortal
        id="place-select"
        options={places}
        value={selectedPlace}
        getOptionLabel={(option) => `${option.name} - ${option.city.name} - ${option.street}`}
        onChange={(event, newValue) => {
          setSelectedPlaceId(newValue ? newValue.id : null);
          setSelectedPlace(newValue);
        }}
        sx={{ mb: 2, width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Wybierz lub szukaj miejsca" />}
        disabled={isNewPlace}
      />
    </>
  );
}

export function PlaceFields({ placeName, setPlaceName, placeStreet, setPlaceStreet, placeOpeningHours, setOpeningHours, cityName, setCityName, theme }) {
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
      <TextField
        label="Nazwa restauracji"
        variant="outlined"
        fullWidth
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Ulica"
        variant="outlined"
        fullWidth
        value={placeStreet}
        onChange={(e) => setPlaceStreet(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Godziny otwarcia"
        variant="outlined"
        fullWidth
        value={placeOpeningHours}
        onChange={(e) => setOpeningHours(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Miasto"
        variant="outlined"
        fullWidth
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        sx={{ mb: 2 }}
      />
    </>
  );
}

export function OpinionFields({ newOpinion, setNewOpinion }) {
  return (
    <TextField
      label="Twoja opinia"
      multiline
      rows={6}
      fullWidth
      variant="outlined"
      value={newOpinion}
      onChange={(e) => setNewOpinion(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
}
