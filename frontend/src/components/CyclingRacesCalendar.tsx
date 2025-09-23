import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import type { CyclingRace } from '../types/cyclingRace';
import cyclingRacesService from '../services/cyclingRaces';
import CyclingRaceCard from './CiclyngRaceCard';

import { useEffect, useState } from 'react';


const CyclingRacesCalendar = () => {
  const [races, setRaces] = useState<CyclingRace[]>([])

  const handleRaces = () => {
    cyclingRacesService.getAllRaces().then((allRaces) => {
      console.log(allRaces)
      setRaces(allRaces)
    })
  }
  useEffect(handleRaces, []);

  return (
    <>
      <Typography color="white" variant='h3' fontWeight="bold" mb={5} mt={0}>
        Calendario Carreras 2025
      </Typography>
      <Grid container spacing={6}>
        {races.map((race) => 
          <Grid item key={race.id} xs={3} sm={6} md={4}>
            <CyclingRaceCard  race={race} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default CyclingRacesCalendar;