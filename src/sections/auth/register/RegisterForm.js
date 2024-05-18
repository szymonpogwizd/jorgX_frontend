import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment, Button, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import AlertMessage from '../../@dashboard/common/AlertMessage';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleRegister = async () => {
    const errors = {
      name: name === '',
      email: email === '',
      password: password === '',
      confirmPassword: confirmPassword === '',
    };

    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors);
      setAlertMessage("Wszystkie pola są obowiązkowe");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      handleCloseAlert();
      setErrorCount(prevCount => prevCount + 1);
      setAlertMessage(`[${errorCount}] Hasła nie są takie same`);
      setShowAlert(true);
      return;
    }

    const data = {
      name,
      email,
      password,
      userType: 'USER',
      active: true,
    };

    fetch("http://127.0.0.1:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(errorText);
          });
        }
        navigate('/login', { replace: true });
        return response.json();
      })
      .catch((error) => {
        handleCloseAlert();
        setErrorCount(prevCount => prevCount + 1);
        setAlertMessage(`[${errorCount}] Wystąpił błąd podczas rejestracji: ${error.message}`);
        setShowAlert(true);
      });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const resetAlert = () => {
    setAlertMessage("");
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          severity="error"
          title="Error"
          message={alertMessage}
          onClose={handleCloseAlert}
          resetAlert={resetAlert}
        />
      )}

      <Stack spacing={3}>
        <TextField
          label="Nazwa użytkownika"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors({ ...fieldErrors, name: e.target.value === '' });
          }}
          error={fieldErrors.name}
          helperText={fieldErrors.name ? "Pole jest wymagane" : ""}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors({ ...fieldErrors, email: e.target.value === '' });
          }}
          error={fieldErrors.email}
          helperText={fieldErrors.email ? "Pole jest wymagane" : ""}
        />
        <TextField
          label="Hasło"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors({ ...fieldErrors, password: e.target.value === '' });
          }}
          error={fieldErrors.password}
          helperText={fieldErrors.password ? "Pole jest wymagane" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Powtórz hasło"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setFieldErrors({ ...fieldErrors, confirmPassword: e.target.value === '' });
          }}
          error={fieldErrors.confirmPassword}
          helperText={fieldErrors.confirmPassword ? "Pole jest wymagane" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegister} sx={{ my: 3 }}>
        Zarejestruj się
      </LoadingButton>

      <Button fullWidth size="large" variant="outlined" onClick={handleBackToLogin} sx={{ mb: 3 }}>
        Logowanie
      </Button>
    </>
  );
}
