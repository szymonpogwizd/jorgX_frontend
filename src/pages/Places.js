import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  PlaceList,
  FloatingActionButtonsSave,
  FloatingActionButtonsClean,
  TextFieldName,
  TextFieldStreet,
  TextFieldOpenHours,
  AlertMessage,
} from '../sections/@dashboard/places';

// ----------------------------------------------------------------------

export default function Places() {
  const theme = useTheme();
  const [nameValue, setNameValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [openHoursValue, setOpenHoursValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [idValue, setIdValue] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const resetForm = () => {
    setNameValue("");
    setCityValue("");
    setStreetValue("");
    setOpenHoursValue("");
    setIdValue("");
    setRefreshKey(prevKey => prevKey + 1);
    setIsUpdateMode(false);
  };

  const checkPlaceExists = async (name, street) => {
    try {
      const response = await fetch(`http://localhost:8080/dashboard/place/checkPlaceExists?name=${name}&street=${street}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const exists = await response.json();
      return exists;
    } catch (error) {
      console.error('Error checking place existence:', error);
      return false;
    }
  };

  const handleSaveClick = async () => {
    if (!nameValue.trim()) {
      setAlertMessage("Nazwa miejsca nie może być pusta.");
      setShowAlert(true);
      return;
    }

    const placeExists = await checkPlaceExists(nameValue, streetValue);
    if (placeExists) {
      setAlertMessage(`Miejsce o nazwie ${nameValue} i adresie ${streetValue} już istnieje.`);
      setShowAlert(true);
      return;
    }

    const data = {
      name: nameValue,
      openingHours: openHoursValue,
      street: streetValue,
    };

    fetch("http://localhost:8080/dashboard/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(errorText);
          });
        }
        handleCloseAlert();
        setSuccessAlertMessage(`Pomyślnie utworzono miejsce ${nameValue}`);
        setShowSuccessAlert(true);
        resetForm();
        return response.json();
      })
      .catch((error) => {
        handleCloseSuccessAlert();
        setAlertMessage(error.message);
        setShowAlert(true);
      });
  };

  const handleUpdateClick = async () => {
    if (!nameValue.trim()) {
      setAlertMessage("Nazwa miejsca nie może być pusta.");
      setShowAlert(true);
      return;
    }

    const placeExists = await checkPlaceExists(nameValue, streetValue);
    if (placeExists) {
      setAlertMessage(`Takie miejsce już istnieje.`);
      setShowAlert(true);
      return;
    }

    const dataPlace = {
      name: nameValue,
      openingHours: openHoursValue,
      street: streetValue,
    };

    fetch(`http://localhost:8080/dashboard/place/up/${idValue}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(dataPlace),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(errorText);
          });
        }
        setSuccessAlertMessage(`Pomyślnie zaktualizowano miejsce ${nameValue}`);
        handleCloseAlert();
        setShowSuccessAlert(true);
        resetForm();
        return response.json();
      })
      .catch((error) => {
        handleCloseSuccessAlert();
        setAlertMessage(error.message);
        setShowAlert(true);
      });
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleOpenHoursChange = (event) => {
    setOpenHoursValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreetValue(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const resetAlert = () => {
    setAlertMessage("");
  };

  return (
    <>
      <Helmet>
        <title> Miejsca | JorgX</title>
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
          Miejsca
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                <PlaceList
                  refreshKey={refreshKey}
                  setNameValue={setNameValue}
                  setIdValue={setIdValue}
                  setIsUpdateMode={setIsUpdateMode}
                  setCityValue={setCityValue}
                  setStreetValue={setStreetValue}
                  setOpenHoursValue={setOpenHoursValue}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue} disabled={!isUpdateMode} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldOpenHours onChange={handleOpenHoursChange} value={openHoursValue} disabled={!isUpdateMode} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldStreet onChange={handleStreetChange} value={streetValue} disabled={!isUpdateMode} />
              </Grid>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <FloatingActionButtonsClean onClick={resetForm} />
                </Grid>
                <Grid item>
                  <FloatingActionButtonsSave
                    onClick={isUpdateMode ? handleUpdateClick : handleSaveClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
