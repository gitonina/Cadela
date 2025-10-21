import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RouteIcon from '@mui/icons-material/Route';
import LandscapeIcon from '@mui/icons-material/Landscape';
import EventIcon from '@mui/icons-material/Event';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

import SubscribeButton from './SubscribeInscription';
import type { CyclingRace } from '../types/cyclingRace';
import { formatDate } from '../utils/dates';

export default function ActiveCyclingRaceCard(props: { race: CyclingRace }) {
  const { race } = props;
  const [showRegister, setShowRegister] = useState<boolean>(false);

  // Defensive check - if circuitId is not populated, don't render
  if (!race.circuitId) {
    console.error('Race circuitId is not populated:', race);
    return (
      <Typography color="error">
        Error: Los datos del circuito no están disponibles
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={race.circuitId.pathPhoto}
        title="autodromo vizcachas"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {race.circuitId.name}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
            <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle1" color="text.secondary">
                {formatDate(race.date)}
            </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={1}>
            <Stack alignItems="center" direction="row" gap={1} color={"#1976d2"}>
                <RouteIcon fontSize="small" />
                <Typography> {race.circuitId.distance} km </Typography>
            </Stack>
            <Stack alignItems="center" direction="row" gap={1} color={"#1976d2"}>
                <LandscapeIcon fontSize="small" /> 
                <Typography> {race.circuitId.elevationGain} m </Typography>
            </Stack>
        </Stack>
        
      </CardContent>
      <CardActions sx={{ flexDirection: "column", alignItems: "stretch" }}>
        <SubscribeButton raceId={race.id} />

        <Button
          size="small"
          href='https://www.relive.com/view/vMv8G1nVLPq'
          target="_blank"
          rel="noopener noreferrer"
          color='info'
        >
          Circuito en Relieve
        </Button>
      </CardActions>
    </Card>
  );
}