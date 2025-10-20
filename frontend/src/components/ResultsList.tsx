import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";

import { useEffect, useState } from "react";
import FinishedCyclingRaceCard from "./FinishedCyclingRaceCard";

const ResultsList = () => {
  const [races, setRaces] = useState<CyclingRace[]>([]);

  const handleRaces = () => {
    cyclingRacesService.getAllRaces().then((allRaces) => {
      console.log(allRaces);
      setRaces(allRaces);
    });
  };
  useEffect(handleRaces, []);

  return (
    <>
      <Typography color="white" variant="h3" fontWeight="bold" mb={5} mt={0}>
        Lista de resultados de carreras
      </Typography>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        width="80vw"
      >
        {races.map((race) => (
          <Grid key={race.id}>
            <FinishedCyclingRaceCard race={race} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ResultsList;
