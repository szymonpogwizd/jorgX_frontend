import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/system';

const StyledAlert = styled(Alert)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10000,
});

export default function AlertMessage({ severity, title, message, onClose, autoCloseTime = 5000, resetAlert }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, autoCloseTime);

    return () => {
      clearTimeout(timer);
    };
  }, [autoCloseTime, message]);

  const handleAlertClose = () => {
    setVisible(false);
    resetAlert(); // reset the alert state when the alert is closed
    onClose();
  };

  return (
    <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
      <StyledAlert severity={severity} onClose={handleAlertClose} variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </StyledAlert>
    </Slide>
  );
}
