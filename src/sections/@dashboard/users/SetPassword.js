import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from '@mui/material';
import { Icon } from "@iconify/react";
import eyeFill from "@iconify-icons/eva/eye-fill";
import eyeOffFill from "@iconify-icons/eva/eye-off-fill";

const PasswordFields = ({ onPasswordChange, onPasswordsMatchChange, resetPasswords, onReset }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    onPasswordChange(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    const passwordsMatch = password === event.target.value;
    onPasswordsMatchChange(passwordsMatch);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordsMatch = password === confirmPassword;

  useEffect(() => {
      if (resetPasswords) {
        setPassword("");
        setConfirmPassword("");
        onReset();
      }
    }, [resetPasswords, onReset]);

  return (
    <div>
      <Typography variant="p">
        Ustawienie hasła:
      </Typography>

      <TextField
        sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
        name="password"
        label="Hasło"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        name="confirmPassword"
        label="Potwierdź hasło"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={!isPasswordsMatch}
        fullWidth
      />
    </div>
  );
};

export default PasswordFields;
