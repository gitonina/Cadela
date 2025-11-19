import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";

import { useEffect, useState } from "react";
import FinishedCyclingRaceCard from "./FinishedCyclingRaceCard";
import { Box, CircularProgress } from "@mui/material";

const ResultsList = () => {
  const [races, setRaces] = useState<CyclingRace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleRaces = async () => {
      try {
        setIsLoading(true);
        const allRaces = await cyclingRacesService.getPastRaces();
        console.log(allRaces);
        setRaces(allRaces);
      } catch (error) {
        console.error("Error fetching races:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleRaces();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography color="white" variant="h6" ml={2}>
          Cargando resultados de carreras...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography 
        color="white" 
        variant="h3" 
        fontWeight="bold" 
        mb={5} 
        mt={5}>
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
