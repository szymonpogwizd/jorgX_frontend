import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import {
  Grid, Container, Typography, TextField, Box,
  FormControlLabel, Switch, FormControl, InputLabel,
  Select, MenuItem, Autocomplete
} from '@mui/material';
import { FloatingActionButtonsSave, AlertMessage } from '../sections/@dashboard/opinionForm';

export default function Contact() {
  const [newOpinion, setNewOpinion] = useState('');
  const [isNewPlace, setIsNewPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [cities, setCities] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [placeStreet, setPlaceStreet] = useState('');
  const [placeOpeningHours, setOpeningHours] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityName, setCityName] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('');
  const [alertCount, setAlertCount] = useState(0);
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

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/city", { headers })
      .then(response => response.json())
      .then(data => {
        setCities(data);
      })
      .catch(error => {
        console.error('Failed to load cities:', error);
      });
  }, []);

  const handleSaveOpinion = () => {
    if (isNewPlace) {
      const errors = [];

      const fields = [
        { value: newOpinion, name: 'Opinia' },
        { value: placeName, name: 'Nazwa restauracji' },
        { value: placeStreet, name: 'Ulica' },
        { value: cityName, name: 'Miasto' }
      ];

      fields.forEach((field, index) => {
        if (!field.value.trim()) {
          errors.push(`'Pole' ${field.name}: 'nie może być puste.'`);
        }
      });

      if (errors.length > 0) {
        const errorMessages = errors.join('\r');
        setAlertCount(prevCount => prevCount + 1);
        setAlertMessage(`[${alertCount}] Wystąpiły następujące błędy:\n${errorMessages}`);
        setShowAlert(true);
        return;
      }

      const newPlaceData = {
        opinion: {
          opinion: newOpinion,
          email: localStorage.getItem('email')
        },
        city: {
          name: cityName
        },
        place: {
          name: placeName,
          street: placeStreet,
          openingHours: placeOpeningHours,
          cityId: null
        }
      };
      console.log(newPlaceData);
      fetch('http://localhost:8080/dashboard/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': headers.Authorization
        },
        body: JSON.stringify(newPlaceData)
      })
        .then(handleResponse)
        .then(data => {
          setPlaceName('');
          setNewOpinion('');
          setPlaceStreet('');
          setCityName('');
          setOpeningHours('');
          setAlertCount(prevCount => prevCount + 1);
          handleCloseAlert();
          setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
          setShowSuccessAlert(true);
        })
        .catch(error => {
          setAlertCount(prevCount => prevCount + 1);
          setAlertMessage(`[${alertCount}] ${error.message}`);
          setShowAlert(true);
        });
    } else {

      if (!newOpinion.trim()) {
        setAlertCount(prevCount => prevCount + 1);
        handleCloseSuccessAlert();
        setAlertMessage(`[${alertCount}] Opinia nie może być pusta.`);
        setShowAlert(true);
        return;
      }

      if (selectedPlaceId === null) {
        setAlertCount(prevCount => prevCount + 1);
        handleCloseSuccessAlert();
        setAlertMessage(`[${alertCount}] Nie wybrano miejsca.`);
        setShowAlert(true);
        return;
      }

      const opinionData = {
        opinion: newOpinion,
        placeId: selectedPlaceId,
        email: localStorage.getItem('email')
      };

      fetch("http://localhost:8080/dashboard/opinion", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': headers.Authorization
        },
        body: JSON.stringify(opinionData)
      })
        .then(handleResponse)
        .then(data => {
          setAlertCount(prevCount => prevCount + 1);
          setNewOpinion('');
          setSelectedPlace(null);
          setSelectedPlaceId(null);
          handleCloseAlert();
          setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
          setShowSuccessAlert(true);
        })
        .catch(error => {
          setAlertCount(prevCount => prevCount + 1);
          handleCloseSuccessAlert();
          setAlertMessage(`[${alertCount}] ${error.message}`);
          setShowAlert(true);
        });
    }
  };

  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const handleError = (error) => {
    setAlertCount(prevCount => prevCount + 1);
    setAlertMessage(`[${alertCount}] ${error.message}`);
    setShowAlert(true);
  };

  const handleSuccess = (data) => {
    setNewOpinion('');
    setAlertCount(prevCount => prevCount + 1);
    setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
    setShowSuccessAlert(true);
  };


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
    setSelectedPlace(newValue);
  };

  const handlePlaceNameChange = (event) => {
    setPlaceName(event.target.value);
  };

  const handlePlaceStreetChange = (event) => {
    setPlaceStreet(event.target.value);
  };

  const handlePlaceOpeningHoursChange = (event) => {
    setOpeningHours(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityName(event.target.value);
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

  const resetAlert = () => {
    setAlertMessage("");
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
      <Helmet>
        <title>Dodaj opinię | JorgX</title>
      </Helmet>

      {showAlert && (
        <AlertMessage
          severity="error"
          title="Błąd"
          message={alertMessage}
          onClose={handleCloseAlert}
          resetAlert={resetAlert}
        />
      )}

      {showSuccessAlert && (
        <AlertMessage
          severity="success"
          title="Sukces"
          message={successAlertMessage}
          onClose={handleCloseSuccessAlert}
          resetAlert={resetAlert}
        />
      )}

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
              value={selectedPlace}
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
              value={placeName}
              onChange={handlePlaceNameChange}
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <TextField
              label="Ulica"
              variant="outlined"
              fullWidth
              value={placeStreet}
              onChange={handlePlaceStreetChange}
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <TextField
              label="Godziny otwarcia"
              variant="outlined"
              fullWidth
              value={placeOpeningHours}
              onChange={handlePlaceOpeningHoursChange}
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
            />

            <TextField
              label="Miasto"
              variant="outlined"
              fullWidth
              value={cityName}
              onChange={handleCityChange}
              disabled={!isNewPlace}
              sx={{ mb: 2, ...(isNewPlace ? {} : disabledStyle) }}
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

            <FloatingActionButtonsSave onClick={handleSaveOpinion} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
