import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";

import { useEffect, useState } from "react";
import { Box, CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import { months } from "../types/date";
import { formatMonth } from "../utils/dates";
import NewCyclingRaceCard from "./NewCyclingRaceCard";

const ResultsList = () => {
  const [selectedMonth, setSelectedMonth] = useState(0);
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
    const today = new Date();
    setSelectedMonth(formatMonth(today));
    handleRaces();
  }, []);

  const onChangeMonthRaces = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value);
  };

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
      <FormControl>  
        <Select
          id="demo-simple-select"
          value={selectedMonth}
          onChange={onChangeMonthRaces}
          sx={{
            backgroundColor:"white",
            padding: 0,
            mb: 6,
            width: 300,
            textAlign: "left"
          }}
        >
          {[...Array(12).keys()].map(i => 
            <MenuItem value={i+1}>{months[i+1]}</MenuItem>)}
        </Select>
      </FormControl>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        width="80vw"
      >
        {races.map((race) => (
          formatMonth(race.date) === selectedMonth ?
          <Grid key={race.id}>
            <NewCyclingRaceCard race={race} cardMode="result"/>
          </Grid> : <></>
        ))}
      </Grid>
    </>
  );
};

export default ResultsList;
