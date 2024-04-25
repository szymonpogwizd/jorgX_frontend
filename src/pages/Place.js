import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Grid, Container, TextField, Box } from '@mui/material';
import Iconify from '../components/iconify';
import { SearchItemWidgets } from '../sections/@dashboard/search';
import { OpinionItemWidgets, FloatingActionButtonsSave, AlertMessage } from '../sections/@dashboard/place';

export default function PlacePage() {
  const location = useLocation();
  const place = location.state.place;
  const [opinions, setOpinions] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetchOpinions();
  }, [place.id]);

  const fetchOpinions = () => {
    fetch(`http://localhost:8080/dashboard/opinion/place/${place.id}`, { headers })
      .then(response => response.json())
      .then(data => setOpinions(data));
  };

  const handleOpinionChange = (event) => {
    setNewOpinion(event.target.value);
  };

  const handleSaveOpinion = () => {
    if (!newOpinion.trim()) {
      setErrorCount(prevCount => prevCount + 1);
      setAlertMessage(`[${errorCount}] Opinia nie może być pusta.`);
      setShowAlert(true);
      return;
    }

    const opinionData = {
      opinion: newOpinion,
      placeId: place.id,
      email: localStorage.getItem('email'),
    };

    submitOpinion(opinionData);
  };

  const submitOpinion = (opinionData) => {
    fetch("http://localhost:8080/dashboard/opinion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": headers.Authorization
      },
      body: JSON.stringify(opinionData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Opinion submitted:', data);
      setNewOpinion('');
      setErrorCount(prevCount => prevCount + 1);
      setSuccessAlertMessage(`[${errorCount}] Opinia została pomyślnie wysłana.`);
      setShowSuccessAlert(true);
    })
    .catch(error => {
      setErrorCount(prevCount => prevCount + 1);
      setAlertMessage(`[${errorCount}] ${error.message}`);
      setShowAlert(true);
    });
  };

  return (
    <>
      <Helmet>
        <title>{place ? `${place.name} | JorgX` : 'JorgX'}</title>
      </Helmet>

      {showAlert && (
        <AlertMessage
          severity="error"
          title="Błąd"
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      {showSuccessAlert && (
        <AlertMessage
          severity="success"
          title="Sukces"
          message={successAlertMessage}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <SearchItemWidgets place={place} showButton={false} />
            <Box my={4}>
              <TextField
                label="Twoja opinia"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={newOpinion}
                onChange={handleOpinionChange}
              />
            <FloatingActionButtonsSave onClick={handleSaveOpinion} />
            </Box>
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
