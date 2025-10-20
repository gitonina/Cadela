import loginService from "../services/login";
import { useState } from "react";
import { useEffect } from "react";
import type { Cyclist } from "../types/cyclist";

import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";





export default function Login() {
      const [name,setName]=useState("")
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
  
   
      <Stack spacing={3} sx={{ maxWidth: 600, margin: "40px auto" }}>
        

       {errorMessage && <Alert severity="error">{errorMessage}</Alert>}


        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Iniciar sesión
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField label="Usuario" variant="outlined" fullWidth />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary">
                  Entrar
                </Button>
               
              </Stack>
            </Stack>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Bienvenido, anonymous</Typography>
            <Button variant="outlined" color="secondary">
              Salir
            </Button>
          </Stack>
        </Paper>
      </Stack>
    );
  
}
