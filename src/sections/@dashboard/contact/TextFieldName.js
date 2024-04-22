import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
      <TextField id="outlined-basic" label="Temat" variant="outlined" fullWidth sx={{ width: "100%", marginBottom: 2 }}/>
  );
}
