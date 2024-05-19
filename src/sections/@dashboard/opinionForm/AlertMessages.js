import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export function AlertMessage({ showAlert, showSuccessAlert, alertMessage, successAlertMessage, onCloseAlert, onCloseSuccessAlert }) {
  return (
    <>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={onCloseAlert}>
        <Alert onClose={onCloseAlert} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccessAlert} autoHideDuration={6000} onClose={onCloseSuccessAlert}>
        <Alert onClose={onCloseSuccessAlert} severity="success" sx={{ width: '100%' }}>
          {successAlertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
