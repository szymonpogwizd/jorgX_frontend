import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const handleOpenMailAppSzymon = (email) => {
  window.location.href = `mailto:${email}`;
};

const handleOpenMailAppMichal = (email) => {
  window.location.href = `mailto:${email}`;
};

const handleOpenMailAppDawid = (email) => {
  window.location.href = `mailto:${email}`;
};

export default function ContactEmails() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Napisz na wybrany e-mail:
      </Typography>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            Szymon Pogwizd:
          </Typography>
          <Typography variant="body1">szymonpogwizd12@gmail.com</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleOpenMailAppSzymon("szymonpogwizd12@gmail.com")}
            >
              Otwórz aplikację poczty
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            Michał Ryś:
          </Typography>
          <Typography variant="body1">ankuzi9811@gmail.com</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleOpenMailAppMichal("ankuzi9811@gmail.com")}
            >
              Otwórz aplikację poczty
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            Dawid Wnękowicz:
          </Typography>
          <Typography variant="body1">wnekowiczdawid@gmail.com</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleOpenMailAppDawid("wnekowiczdawid@gmail.com")}
            >
              Otwórz aplikację poczty
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}