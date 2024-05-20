import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';

function getColor(rating) {
  if (rating > 0.0 && rating <= 2.5) return 'error';
  if (rating > 2.5 && rating <= 3.5) return 'warning';
  if (rating > 3.5) return 'success';
  return 'info';
}

function getIcon(rating) {
  if (rating > 0.0 && rating <= 2.5) return 'ant-design:frown-outlined';
  if (rating > 2.5 && rating <= 3.5) return 'ant-design:meh-outlined';
  if (rating > 3.5) return 'ant-design:smile-outlined';
  return 'ant-design:question-outlined'
}

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(10),
  height: theme.spacing(10),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

SearchItemWidgets.defaultProps = {
  showButton: true
};

export default function SearchItemWidgets({ place, sx, showButton, currentUserRole, headers, places, setPlaces }) {
  const navigate = useNavigate();
  const color = getColor(place.rating);
  const icon = getIcon(place.rating);

  const handleViewReviewsClick = () => {
    navigate('/dashboard/place', { state: { place } });
  };

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
  <Card
    sx={{
      py: 5,
      boxShadow: 0,
      textAlign: 'center',
      color: (theme) => theme.palette[color].darker,
      bgcolor: (theme) => theme.palette[color].lighter,
      ...sx,
    }}
  >
    <Typography variant="h3" sx={{ mb: 2 }}>{place.name}</Typography>
    <StyledIcon
      sx={{
        color: (theme) => theme.palette[color].dark,
        backgroundImage: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
            theme.palette[color].dark,
            0.24
          )} 100%)`,
      }}
    >
      <Iconify icon={icon} width={48} height={48} />
    </StyledIcon>

    <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>
      Średnia ocena: <b>{place.rating || 'brak opinii'}</b>
    </Typography>
    <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>Miasto: <b>{place.city.name}</b></Typography>
    <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>Ulica: <b>{place.street}</b></Typography>
    <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 2 }}>Godziny otwarcia: <b>{place.openingHours}</b></Typography>
{showButton && (
  <div>
    <Button variant="contained" onClick={handleViewReviewsClick} sx={{ mb: 2 }}>
      Zobacz opinie
    </Button>
    {currentUserRole === 'ADMINISTRATOR' && (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDeletePlace(place.id)}
        sx={{ mb: 2, display: 'block', margin: '0 auto' }} // Ustawiamy margines na 'auto' aby wyśrodkować przycisk w poziomie
      >
        Usuń
      </Button>
    )}
  </div>
)}

  </Card>
);
}

SearchItemWidgets.propTypes = {
  place: PropTypes.object.isRequired,
  sx: PropTypes.object,
  showButton: PropTypes.bool,
  currentUserRole: PropTypes.string.isRequired,
  headers: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
  setPlaces: PropTypes.func.isRequired,
};

