import { Box, Button } from '@mui/material';
import CyclingRacesCalendar from "../components/CyclingRacesCalendar";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

const CalendarPage = () => {
    const navigate = useNavigate();
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
            <Button
              onClick={() => navigate("/")}
              startIcon={<HomeIcon />}
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                backgroundColor: '#dc2626'
              }}
            >
              Inicio
            </Button>
        </Box>
    );
}

export default CalendarPage;