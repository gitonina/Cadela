import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ToyoImage from '../assets/toyo.jpg'

import type { CyclingRace } from '../types/cyclingRace';

const CyclingRaceCard = () => {
  return (
    <Card sx={{ width: 500 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ToyoImage}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 0.5 }}>
          <Typography fontWeight="bold" sx={{ fontSize: 29 }}>
            Doble Toyo
          </Typography>
          <Typography variant="h5">
            10/10/25
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 6, mr: 8, mt: 3, mb: 2 }}>
          <Box sx={{ alignItems: 'center' }}>
            <Typography color="grey" variant='h7'>
              Distancia
            </Typography>
            <Typography color="grey" variant='h4' fontWeight="bold">
              100,32 km
            </Typography>
          </Box>
          <Box sx={{ alignItems: 'center' }}>
            <Typography color="grey" variant='h7'>
              Desnivel positivo
            </Typography>
            <Typography color="grey" variant='h4' fontWeight="bold">
              1.302 m
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CyclingRaceCard;


<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 5, mt: 4, mb: 2 }}>
  <Typography color="grey" variant='h4' fontWeight="bold">
    100
  </Typography>
  <Typography color="grey" variant='h4' fontWeight="bold">
    20
  </Typography>
</Box>