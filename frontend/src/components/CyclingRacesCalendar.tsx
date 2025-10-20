import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";
import CyclingRaceCard from "./CyclingRaceCard";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const CyclingRacesCalendar = () => {
  const [races, setRaces] = useState<CyclingRace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleRaces = async () => {
      try {
        setIsLoading(true);
        const allRaces = await cyclingRacesService.getUpcomingRaces();
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
          Cargando calendario de carreras...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography color="white" variant="h3" fontWeight="bold" mb={5} mt={0}>
        Calendario Carreras 2025
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
            <CyclingRaceCard race={race} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CyclingRacesCalendar;
