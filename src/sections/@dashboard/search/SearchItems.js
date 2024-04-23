import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';

function getColor(rating) {
  if (rating <= 2.5) return 'error';
  if (rating <= 3.5) return 'warning';
  return 'success';
}

function getIcon(rating) {
  if (rating <= 2.5) return 'ant-design:frown-outlined';
  if (rating <= 3.5) return 'ant-design:meh-outlined';
  return 'ant-design:smile-outlined';
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

export default function SearchItemWidgets({ rating, city, street, openingHours, name, sx }) {
  const color = getColor(rating);
  const icon = getIcon(rating);

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
      <Typography variant="h3" sx={{ mb: 2 }}>{name}</Typography>
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

      <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>Średnia ocena: <b>{rating}</b></Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>Miasto: <b>{city}</b></Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 1 }}>Ulica: <b>{street}</b></Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.72, mb: 2 }}>Godziny otwarcia: <b>{openingHours}</b></Typography>
      <Button variant="contained">Zobacz opinie</Button>
    </Card>
  );
}

SearchItemWidgets.propTypes = {
  rating: PropTypes.number.isRequired,
  city: PropTypes.string,
  street: PropTypes.string,
  openingHours: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
