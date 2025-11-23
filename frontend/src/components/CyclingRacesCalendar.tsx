import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CyclingRaceCard from "./CyclingRaceCard";

import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useCyclingRacesStore } from "../stores/cyclingRacesStore";


const CyclingRacesCalendar = () => {
  const { upcomingRaces, fetchUpcomingRaces, isLoading } = useCyclingRacesStore();

  useEffect(() => {
    const handleRaces = async () => {
      try {
        await fetchUpcomingRaces();
      } catch (error) {
        console.error("Error fetching races:", error);
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
      <Typography 
        color="white"
        variant="h3" 
        fontWeight="bold" 
        mb={5} 
        mt={5}>
        Calendario Carreras 2025
      </Typography>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        width="80vw"
      >
        {upcomingRaces.map((race) => (
          <Grid key={race.id}>
            <CyclingRaceCard race={race} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CyclingRacesCalendar;
