import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CyclingRaceCard from "./CyclingRaceCard";
import NewCyclingRaceCard from "./NewCyclingRaceCard";

import { useEffect, useState } from "react";
import { 
  CircularProgress, 
  Select, 
  MenuItem, 
  FormControl,
  type SelectChangeEvent
} from "@mui/material";
import { formatMonth } from "../utils/dates";
import { months } from "../types/date";
import { useCyclingRacesStore } from "../stores/cyclingRacesStore";


const CyclingRacesCalendar = () => {
  const { races, fetchAllRaces, isLoading } = useCyclingRacesStore();
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    const handleRaces = async () => {
      try {
        await fetchAllRaces();
      } catch (error) {
        console.error("Error fetching races:", error);
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
          Cargando calendario de carreras...
        </Typography>
      </Box>
    );
  }

  
  return (
    <>
      <FormControl>  
        <Select
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
            <NewCyclingRaceCard race={race} cardMode="calendar"/>
          </Grid> : <></>
        ))}
      </Grid>
    </>
  );
};

export default CyclingRacesCalendar;
