import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { FloatingActionButtonsSave, AlertMessage } from '../sections/@dashboard/opinionForm';
import {
  OpinionForm,
  PlaceFields,
  OpinionFields,
} from '../sections/@dashboard/opinionForm/FormComponents';
import { fetchPlaces, fetchCities, postNewPlace, postOpinion } from '../sections/@dashboard/opinionForm/api';

export default function Contact() {
  const [newOpinion, setNewOpinion] = useState('');
  const [isNewPlace, setIsNewPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [cities, setCities] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [placeStreet, setPlaceStreet] = useState('');
  const [placeOpeningHours, setOpeningHours] = useState('');
  const [cityName, setCityName] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('');
  const [alertCount, setAlertCount] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    fetchPlaces().then(setPlaces).catch(handleError);
    fetchCities().then(setCities).catch(handleError);
  }, []);


  const handleSaveOpinion = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    if (isNewPlace) {
      const errors = [];

      const fields = [
        { value: newOpinion, name: 'Opinia' },
        { value: placeName, name: 'Nazwa restauracji' },
        { value: placeStreet, name: 'Ulica' },
        { value: cityName, name: 'Miasto' }
      ];

      fields.forEach((field) => {
        if (!field.value.trim()) {
          errors.push(`Pole ${field.name}: nie może być puste.`);
        }
      });

      if (errors.length > 0) {
        const errorMessages = errors.join('\r');
        setAlertCount((prevCount) => prevCount + 1);
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

      fetch('http://localhost:8080/dashboard/general', {
        method: 'POST',
        headers,
        body: JSON.stringify(newPlaceData)
      })
        .then(handleResponse)
        .then(() => {
          setPlaceName('');
          setNewOpinion('');
          setPlaceStreet('');
          setCityName('');
          setOpeningHours('');
          setAlertCount((prevCount) => prevCount + 1);
          handleCloseAlert();
          setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
          setShowSuccessAlert(true);
        })
        .catch((error) => {
          setAlertCount((prevCount) => prevCount + 1);
          setAlertMessage(`[${alertCount}] ${error.message}`);
          setShowAlert(true);
        });
    } else {

      if (!newOpinion.trim()) {
        setAlertCount((prevCount) => prevCount + 1);
        handleCloseSuccessAlert();
        setAlertMessage(`[${alertCount}] Opinia nie może być pusta.`);
        setShowAlert(true);
        return;
      }

      if (selectedPlaceId === null) {
        setAlertCount((prevCount) => prevCount + 1);
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
        headers,
        body: JSON.stringify(opinionData)
      })
        .then(handleResponse)
        .then(() => {
          setAlertCount((prevCount) => prevCount + 1);
          setNewOpinion('');
          setSelectedPlace(null);
          setSelectedPlaceId(null);
          handleCloseAlert();
          setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
          setShowSuccessAlert(true);
        })
        .catch((error) => {
          setAlertCount((prevCount) => prevCount + 1);
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
    setAlertCount((prevCount) => prevCount + 1);
    setAlertMessage(`[${alertCount}] ${error.message}`);
    setShowAlert(true);
  };

  const handleSuccess = () => {
    setNewOpinion('');
    setAlertCount((prevCount) => prevCount + 1);
    setSuccessAlertMessage(`[${alertCount}] Opinia została pomyślnie wysłana.`);
    setShowSuccessAlert(true);
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
            <OpinionForm
              isNewPlace={isNewPlace}
              toggleNewPlace={toggleNewPlace}
              places={places}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setSelectedPlaceId={setSelectedPlaceId}
            />
            {isNewPlace && (
              <PlaceFields
                placeName={placeName}
                setPlaceName={setPlaceName}
                placeStreet={placeStreet}
                setPlaceStreet={setPlaceStreet}
                placeOpeningHours={placeOpeningHours}
                setOpeningHours={setOpeningHours}
                cityName={cityName}
                setCityName={setCityName}
                theme={theme}
              />
            )}
            <OpinionFields
              newOpinion={newOpinion}
              setNewOpinion={setNewOpinion}
            />
            <FloatingActionButtonsSave onClick={handleSaveOpinion} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
