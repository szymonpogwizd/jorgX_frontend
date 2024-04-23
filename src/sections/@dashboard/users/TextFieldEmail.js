import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldName({ onChange, value }) {
  return (
    <TextField
      id="outlined-basic"
      label="Email"
      variant="outlined"
      fullWidth
      sx={{ width: "100%", marginBottom: 2 }}
      onChange={onChange}
      value={value}
    />
  );
}
