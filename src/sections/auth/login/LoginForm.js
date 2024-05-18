import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, TextField, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import AlertMessage from '../../@dashboard/common/AlertMessage';

export default function LoginForm() {
  const navigate = useNavigate();
  const [usernameValue, setUsername] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
  }, []);

  const handleGoToPasswordRecovery = () => {
    navigate('/passwordRecovery');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const credentials = {
        username: usernameValue,
        password: passwordValue
      };

      const response = await axios.post('http://127.0.0.1:8080/login', credentials, {
        responseType: 'json',
      });

      if (response.status === 200) {
        const authorizationHeader = response.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (authorizationHeader) {
          localStorage.setItem('token', token);
        }

        const data = JSON.parse(response.config.data);
        const email = data.username;
        if (email) {
          localStorage.setItem('email', email);
        }

        try {
          const userResponse = await axios.get('http://127.0.0.1:8080/dashboard/users/currentUser', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const user = userResponse.data;
          localStorage.setItem('userType', user.userType);
        } catch (error) {
          console.error('Error fetching current user:', error.response ? error.response.data : error.message);
        }


        navigate('/dashboard/search', { replace: true });
      } else {
        handleCloseAlert();
        setErrorCount(prevCount => prevCount + 1);
        setAlertMessage(`[${errorCount}] Błąd logowania`);
        setShowAlert(true);
      }
    } catch (error) {
      if (error.isAxiosError && error.response === undefined) {
        handleCloseAlert();
        setErrorCount(prevCount => prevCount + 1);
        setAlertMessage(`[${errorCount}] Brak połączenia z serwerem`);
        setShowAlert(true);
      } else {
        handleCloseAlert();
        setErrorCount(prevCount => prevCount + 1);
        setAlertMessage(`[${errorCount}] Błędny login lub hasło`);
        setShowAlert(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const resetAlert = () => {
    setAlertMessage("");
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          severity="error"
          title="Błąd"
          message={alertMessage}
          onClose={handleCloseAlert}
          resetAlert={resetAlert}
        />
      )}

      <Stack spacing={3}>
        <TextField name="username" label="Nazwa użytkownika" value={usernameValue} onChange={handleUsernameChange} />

        <TextField
          name="password"
          label="Hasło"
          value={passwordValue}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      {/*
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Checkbox name="remember" />
            <Typography variant="body2">Zapamiętaj mnie</Typography>
          </Stack>
          <Link
            variant="subtitle2"
            underline="hover"
            style={{ cursor: 'pointer' }}
            onClick={handleGoToPasswordRecovery}
          >
            Nie pamiętasz hasła?
          </Link>
        </Stack>
        */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin} sx={{ my: 3 }}>
        Zaloguj
      </LoadingButton>

      <Typography variant="body2" align="center">
        Nie masz konta?{' '}
        <Link
          variant="subtitle2"
          underline="hover"
          style={{ cursor: 'pointer' }}
          onClick={handleGoToRegister}
        >
          Zarejestruj się
        </Link>
      </Typography>
    </>
  );
}
