import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { CyclingRace } from '../types/cyclingRace';
import cyclingRacesService from '../services/cyclingRaces';
import CyclingRaceCard from "./CyclingRaceCard";

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
      <Grid container spacing={6} justifyContent="center" alignItems="center" width="80vw">
        {races.map((race) => 
          <Grid item key={race.id}>
            <CyclingRaceCard race={race} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default CyclingRacesCalendar;