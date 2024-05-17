import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, IconButton } from '@mui/material';
import Iconify from '../../../components/iconify';

function getColor(opinionType) {
  if (opinionType === 'NEGATIVE') return 'error';
  if (opinionType === 'AMBIGUOUS') return 'warning';
  if (opinionType === 'POSITIVE') return 'success';
  if (opinionType === 'NEUTRAL') return 'info';
  return 'info';
}

function getIcon(opinionType) {
  if (opinionType === 'NEGATIVE') return 'ant-design:frown-outlined';
  if (opinionType === 'AMBIGUOUS') return 'ant-design:meh-outlined';
  if (opinionType === 'POSITIVE') return 'ant-design:smile-outlined';
  if (opinionType === 'NEUTRAL') return 'ant-design:question-outlined';
  return 'ant-design:question-outlined';
}

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(10),
  height: theme.spacing(10),
  justifyContent: 'center',
}));

export default function OpinionItemWidgets({ opinion, currentUserEmail, currentUserRole, onDelete, sx }) {
  const color = getColor(opinion.opinionType);
  const icon = getIcon(opinion.opinionType);

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        mb: 2,
        ...sx,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" sx={{ opacity: 0.72 }}><b>{opinion.user.email}</b></Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>{opinion.opinion}</Typography>
        </Grid>
        {(opinion.user.email === currentUserEmail || currentUserRole === 'ADMINISTRATOR') && (
          <Grid item xs={2}>
            <IconButton onClick={() => onDelete(opinion.id)}>
              <Iconify icon="mdi:delete" width={24} height={24} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

OpinionItemWidgets.propTypes = {
  opinion: PropTypes.object.isRequired,
  currentUserEmail: PropTypes.string.isRequired,
  currentUserRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
