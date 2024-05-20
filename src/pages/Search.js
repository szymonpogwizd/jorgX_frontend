import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TextField, useTheme, Grid, Container, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import Iconify from '../components/iconify';
import { SearchItemWidgets } from '../sections/@dashboard/search';

export default function SearchPage() {
  const theme = useTheme();
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortCriterion, setSortCriterion] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const [currentUserRole, setCurrentUserRole] = useState('');
  const currentUserEmail = localStorage.getItem('email');

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/place", { headers })
      .then(response => response.json())
      .then(data => {
        setPlaces(data);
      });
    loadCurrentUserRole();
  }, []);

  const loadCurrentUserRole = () => {
    fetch(`http://localhost:8080/dashboard/users/userType/${currentUserEmail}`, { headers })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        setCurrentUserRole(data);
      })
      .catch(error => {
        console.error('Error while fetching user role:', error);
      });
  };

  const handleSortChange = (event) => {
    setSortCriterion(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortPlaces = (places, criterion, order) => {
    return places.sort((a, b) => {
      let aValue;
      let bValue;

      switch (criterion) {
        case 'city':
          aValue = a.city.name.toLowerCase();
          bValue = b.city.name.toLowerCase();
          break;
        case 'street':
          aValue = a.street.toLowerCase();
          bValue = b.street.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedPlaces = sortPlaces([...places], sortCriterion, sortOrder);

  const filteredPlaces = sortedPlaces.filter(place =>
    place.city.name.toLowerCase().includes(searchText.toLowerCase()) ||
    place.street.toLowerCase().includes(searchText.toLowerCase()) ||
    place.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeletePlace = async (placeId) => {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć to miejsce i wszystkie związane z nim opinie?');
    if (!confirmed) return;

    try {
      const opinionResponse = await fetch(`http://localhost:8080/dashboard/opinion/place/${placeId}`, {
        method: 'DELETE',
        headers,
      });

      if (!opinionResponse.ok) {
        throw new Error('Błąd podczas usuwania opinii');
      }

      const placeResponse = await fetch(`http://localhost:8080/dashboard/place/${placeId}`, {
        method: 'DELETE',
        headers,
      });

      if (!placeResponse.ok) {
        throw new Error('Błąd podczas usuwania miejsca');
      }

      setPlaces(places.filter(place => place.id !== placeId));
    } catch (error) {
      console.error('Błąd podczas usuwania miejsca:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Szukaj miejsca | JorgX</title>
      </Helmet>

      <Container maxWidth="xl">
        <TextField
          fullWidth
          label="Szukaj miejsca"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Sortuj według</InputLabel>
          <Select
            value={sortCriterion}
            onChange={handleSortChange}
            label="Sortuj według"
          >
            <MenuItem value="name">Nazwa</MenuItem>
            <MenuItem value="city">Miasto</MenuItem>
            <MenuItem value="street">Ulica</MenuItem>
            <MenuItem value="rating">Ocena</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={handleSortOrderChange} sx={{ mb: 2 }}>
          <Iconify icon={sortOrder === "asc" ? "eva:arrow-upward-outline" : "eva:arrow-downward-outline"} />
        </IconButton>
        <Grid container spacing={3}>
          {filteredPlaces.map((place) => (
            <Grid item xs={12} sm={6} md={3} key={place.id}>
              <SearchItemWidgets
                place={place}
                currentUserRole={currentUserRole}
                headers={headers}
                places={places}
                setPlaces={setPlaces}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
