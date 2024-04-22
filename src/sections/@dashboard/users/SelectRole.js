import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels({ onChange, value }) {
  const [role, setRole] = React.useState('');
  const [data, setData] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/users/userTypes", { headers })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setRole('USER');
        onChange('USER');
      });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", marginBottom: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Rola</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Rola"
          onChange={handleChange}
        >
          {data.map((item) => (
            <MenuItem value={item} key={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}