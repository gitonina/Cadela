import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import LandscapeIcon from '@mui/icons-material/Landscape';
import EventIcon from '@mui/icons-material/Event';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

import InscriptionForm from './InscriptionForm';

export default function ActiveCyclingRaceCard() {

  const [showRegister, setShowRegister] = useState<boolean>(false);

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="/src/assets//autodromo.png"
        title="autodromo vizcachas"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          Autódromo Vizcachas
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
            <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle1" color="text.secondary">
                15 de Septiembre, 2024
            </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={1}>
            <Stack alignItems="center" direction="row" gap={1} color={"#1976d2"}>
                <AvTimerIcon fontSize="small" />
                <Typography> 2:00:00 hrs </Typography>
            </Stack>
            <Stack alignItems="center" direction="row" gap={1} color={"#1976d2"}>
                <LandscapeIcon fontSize="small" /> 
                <Typography> 500 mts </Typography>
            </Stack>
        </Stack>
        <Typography variant='body2' sx={{ textAlign: 'left' }}>
            INSCRIPCIONES
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'left', color: 'text.secondary', whiteSpace: "pre-line" }}>
            Hasta el sábado 13 de Septiembre a las 18:00 hrs, el valor de inscripción será de $12.000.-
            Desde el sábado a las 18:00 hrs, el valor de inscripción será de $15.000.-
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" color='info' onClick={() => setShowRegister(!showRegister)}>Inscribirse</Button>
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

      {showRegister && (
        <InscriptionForm  />
      )}
    </Card>
  );
}