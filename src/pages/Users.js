import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  UserList,
  FloatingActionButtonsSave,
  FloatingActionButtonsClean,
  TextFieldName,
  SelectRole,
  SwitchActive,
  TextFieldEmail,
  SetPassword,
  AlertMessage,
} from '../sections/@dashboard/users';

// ----------------------------------------------------------------------   

export default function Users() {
  const theme = useTheme();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [activeValue, setActiveValue] = useState(true);
  const [roleValue, setRoleValue] = useState('');
  const [passwordValue, setPasswordValue] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [resetPasswords, setResetPasswords] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [idValue, setIdValue] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const resetForm = () => {
    setNameValue("");
    setEmailValue("");
    setActiveValue(true);
    setRoleValue('USER');
    setResetPasswords(true);
    setIdValue("");
    setRefreshKey(prevKey => prevKey + 1);
    setIsUpdateMode(false);
  };

   const handleSaveClick = () => {

    const data = {
      name: nameValue,
      email: emailValue,
      active: activeValue,
      userType: roleValue,
      password: passwordValue,
    };

      fetch("http://localhost:8080/dashboard/users", {
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
            setSuccessAlertMessage(`Pomyślnie utworzono użytkownika ${nameValue}`);
            setShowSuccessAlert(true);
            resetForm();
            return response.json();
        })
        .catch((error) => {
          handleCloseSuccessAlert();
          setErrorCount(prevCount => prevCount + 1);
          setAlertMessage(`[${errorCount}] ${error.message}`);
          setShowAlert(true);
        });
    };

      const handleUpdateClick = () => {

            const dataUsers = {
              name: nameValue,
              email: emailValue,
              userType: roleValue,
              active: activeValue,
              password: passwordValue,
            };

            fetch(`http://localhost:8080/dashboard/users/${idValue}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(dataUsers),
            })
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((errorText) => {
                    throw new Error(errorText);
                  });
                }
                setSuccessAlertMessage(`Pomyślnie zaktualizowano użytkownika ${nameValue}`);
                handleCloseAlert();
                setShowSuccessAlert(true);
                resetForm();
                return response.json();
              })
              .catch((error) => {
                handleCloseSuccessAlert();
                setErrorCount(prevCount => prevCount + 1);
                setAlertMessage(`[${errorCount}] ${error.message}`);
                setShowAlert(true);
              });
          };

    const handleNameChange = (event) => {
      const value = event.target.value;
      setNameValue(value);
    }

    const handleEmailChange = (event) => {
      const value = event.target.value;
      setEmailValue(value);
    }

    const handleSwitchChange = (value) => {
      setActiveValue(value);
    };

    const handleRoleChange = (value) => {
      setRoleValue(value);
    };

    const handlePasswordChange = (value) => {
      setPasswordValue(value);
    };

    const handlePasswordsMatchChange = (value) => {
      setPasswordsMatch(value);
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
        <title> Użytkownicy | JorgX</title>
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
          Użytkownicy
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                <UserList
                    refreshKey={refreshKey}
                    setNameValue={setNameValue}
                    setIdValue={setIdValue}
                    setIsUpdateMode={setIsUpdateMode}
                    setEmailValue={setEmailValue}
                    setRoleValue={setRoleValue}
                    setActiveValue={setActiveValue}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldEmail onChange={handleEmailChange} value={emailValue}/>
              </Grid>
              <Grid item xs={12}>
                <SelectRole onChange={handleRoleChange} value={roleValue} />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive onSwitchChange={handleSwitchChange} activeValue={activeValue} />
              </Grid>
              <Grid item xs={12}>
                <SetPassword
                    onPasswordChange={handlePasswordChange}
                    onPasswordsMatchChange={handlePasswordsMatchChange}
                    resetPasswords={resetPasswords}
                    onReset={() => setResetPasswords(false)}
                />
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
