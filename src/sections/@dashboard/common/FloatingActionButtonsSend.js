import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Send';

export default function FloatingActionButtonsSave(props) {
  const { onClick } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" aria-label="save" sx={{ marginTop: 4 }} onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
}
