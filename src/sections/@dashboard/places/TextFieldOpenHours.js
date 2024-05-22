import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldOpenHours({ onChange, value, disabled }) {
  return (
    <TextField
      id="outlined-basic"
      label="Godziny Otwarcia"
      variant="outlined"
      fullWidth
      sx={{ width: "100%", marginBottom: 2 }}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}
