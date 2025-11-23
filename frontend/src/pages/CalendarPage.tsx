import { Box } from '@mui/material';
import CyclingRacesCalendar from "../components/CyclingRacesCalendar";
import { Typography } from '@mui/material';

const CalendarPage = () => {
    return(
        <Box sx={{
            alignItems: "center",
            display:"flex",
            flexDirection: 'column'
        }}>
            <Typography 
              color="white"
              variant="h4" 
              fontWeight="bold" 
              mt={5}
              mb={3} 
            >
              Calendario Carreras 2025
            </Typography>
            <Typography 
              color="white"
              variant="h6" 
              fontWeight="bold" 
              mb={3} 
            >
              Selecciona un mes para ver las carreras disponibles
            </Typography>
            <CyclingRacesCalendar />
        </Box>
    );
}

export default CalendarPage;