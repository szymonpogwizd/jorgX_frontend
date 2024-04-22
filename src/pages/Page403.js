import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <>
      <Helmet>
        <title>403 Forbidden | JorgX</title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
         <Typography variant="h4" paragraph>
          Brak dostępu!
         </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Nie masz uprawnień do uzyskania dostępu do tej strony. <br/>
          Sprawdź swoje uprawnienia lub skontaktuj się z administratorem.
        </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_403.png"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Wróć do strony głównej
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
