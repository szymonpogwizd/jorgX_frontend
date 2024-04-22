import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearch(newSearchText);
  };

  return (
    <TextField
      label="Szukaj użytkownika"
      fullWidth
      value={searchText}
      onChange={handleChange}
      InputProps={{
          startAdornment: (
            <SearchIcon
              sx={{ color: 'action.active', marginRight: 1 }}
            />
          ),
        }}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchField;
