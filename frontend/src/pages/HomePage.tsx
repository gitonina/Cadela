import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ActiveCyclingRaceCard from "../components/ActiveCyclingRaceCard";
import Button from "@mui/material/Button";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import { useState, useEffect } from "react";
export default function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      setUser(loggedUser);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await loginService.logout();
    setUser(null);
    window.location.reload(); // 🔄 refresca para limpiar estados visibles
  };








    return (
        
    <>
       <Stack spacing={2} sx={{ p: 3 }}>
      {user ? (
        <>
          <Typography variant="h6">
             Bienvenido, {user.name}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </>
      ) : (
        <Typography variant="body1">
          No has iniciado sesión.
        </Typography>
      )}
    </Stack>
     



        <Box sx={{ textAlign: 'center', py: 8 }}>
            {/* Hero Section */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 3 }}>
                <DirectionsBikeIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
                <Typography variant="h2" component="h1" fontWeight="bold" color="secondary.main">
                CICLISMO CADELA
                </Typography>
            </Stack>
            
            <Typography variant="h5" color="secondary.light" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
                Participa en las mejores carreras de ciclismo de Santiago
            </Typography>

            <Typography variant="h6" color="secondary.light" sx={{ mb: 6 }}>
                PRÓXIMA CARRERA
            </Typography>

            <ActiveCyclingRaceCard />

            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 4 }}
                onClick={() => navigate('/calendar')}
            >
                Ver calendario de carreras
            </Button>
        </Box>

         </>
    )
}