import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ActiveCyclingRaceCard from "../components/ActiveCyclingRaceCard";
import Button from "@mui/material/Button";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Cyclist } from "../types/cyclist";
import loginService from "../services/login";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Paper,
  TextField,
  List,
  Divider,
  Alert,
} from "@mui/material";

import Login from "../components/Login";
import Signin from "../components/SignIn";








export default function HomePage() {
    const navigate = useNavigate();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [cyclist,setCyclist]=useState<Cyclist | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
   
    useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      if (loggedUser) {
        setCyclist(loggedUser);
      }
    };
    init();
  }, []);


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setCyclist(loggedUser);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Credenciales incorrectas");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setCyclist(null);
    setGuestMode(false);
  };

//   const enterAsGuest = async () => {
//     setGuestMode(true);
//     const data = await postService.getAll();
//     setComments(data);
//   };





    return (
        
    <>
      <Signin/>
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