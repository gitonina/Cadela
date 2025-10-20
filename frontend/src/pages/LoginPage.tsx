import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import type { Cyclist } from "../types/cyclist";
import { useEffect } from "react";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";
export default function LoginPage(){
    const navigate = useNavigate();
    const [cyclist,setCyclist]=useState<Cyclist | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")

   
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
      const loggedUser = await loginService.login({ name, password });
      setCyclist(loggedUser);
      setName("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Credenciales incorrectas");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setCyclist(null);
  };


    return (
       <Stack spacing={3} sx={{  }}>
        

        <Alert severity="error">Error</Alert>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Iniciar sesión 
          </Typography>
          <form>
            <Stack spacing={2}>
              <TextField label="Usuario" variant="outlined" fullWidth />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="primary">
                  Entrar
                </Button>
                


                <Button variant="contained" onClick={() => navigate('/sign-in')} color="primary">
                  Crear cuenta
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>

      
      </Stack>
   
    );
}