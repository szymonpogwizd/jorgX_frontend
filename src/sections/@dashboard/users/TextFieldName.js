import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldName({ onChange, value, disabled }) {
  return (
    <TextField
      id="outlined-basic"
      label="Nazwa użytkownika"
      variant="outlined"
      fullWidth
      sx={{ width: "100%", marginBottom: 2 }}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}
