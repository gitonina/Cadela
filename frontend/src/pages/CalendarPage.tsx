import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CyclingRacesCalendar from "../components/CyclingRacesCalendar";

export default function CalendarPage() {
    const navigate = useNavigate();
    return(
        <Box sx={{
            alignItems: "center",
            display:"flex",
            flexDirection: 'column'
        }}>
            <CyclingRacesCalendar />
            <Button
                onClick={() => navigate('/')}
                variant="outlined"
                startIcon={<HomeIcon />}
                sx={{ m: 5 }}
            >
                Inicio
            </Button>
        </Box>
    );
}