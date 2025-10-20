import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Cyclist } from "../types/cyclist";
import loginService from "../services/login";

export default function LoginPage() {
  const navigate = useNavigate();
  const [cyclist, setCyclist] = useState<Cyclist | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      if (loggedUser) setCyclist(loggedUser);
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
      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      const msg =
        error.response?.data?.error || "Credenciales incorrectas o servidor no disponible.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleLogout = async () => {
    await loginService.logout();
    setCyclist(null);
  };

  if (cyclist) {
    return (
      <Stack spacing={3}>
        <Alert severity="success">Sesión iniciada como {name}</Alert>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, margin: "40px auto" }}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Entrar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/sign-in")}
              >
                Crear cuenta
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
