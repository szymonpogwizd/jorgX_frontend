import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtonsAdd(props) {
  const { onClick } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" aria-label="add" sx={{ marginTop: 4 }} onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
}
