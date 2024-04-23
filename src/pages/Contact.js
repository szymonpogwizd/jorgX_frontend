import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, } from '@mui/material';
import {
  ContactDescription,
  ContactForm,
  FloatingActionButtonsSend,

} from '../sections/@dashboard/contact';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Kontakt | JorgX</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kontakt
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <ContactDescription />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}