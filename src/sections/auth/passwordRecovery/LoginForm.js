import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Link, Stack, IconButton, Typography, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/login', { replace: true });
  };

  const handleBackToLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="p" sx={{ mb: 1 }}>
          Aby odzyskać dostęp do konta wpisz swój adres e-mail w polu poniżej i kliknij przycisk "Wyślij". Na podany adres e-mail zostanie wysłana wiadomość z nowym hasłem.
        </Typography>
        <TextField name="email" label="Adres email" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Box flex={1} textAlign="right">
          <Link
            variant="subtitle2"
            underline="hover"
            style={{ cursor: 'pointer' }}
            onClick={handleBackToLoginClick}
          >
            Wróć do panelu logowania
          </Link>
        </Box>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Wyślij
      </LoadingButton>
    </>
  );
}
