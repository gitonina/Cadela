import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import FinishedCyclingRaceCard from "./FinishedCyclingRaceCard";
import { Box, CircularProgress } from "@mui/material";

import { useCyclingRacesStore } from "../stores/cyclingRacesStore";

const ResultsList = () => {
  const { pastRaces, fetchPastRaces, isLoading } = useCyclingRacesStore();

  useEffect(() => {
    const handleRaces = async () => {
      try {
        await fetchPastRaces();
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
        {pastRaces.map((race) => (
          <Grid key={race.id}>
            <FinishedCyclingRaceCard race={race} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ResultsList;
