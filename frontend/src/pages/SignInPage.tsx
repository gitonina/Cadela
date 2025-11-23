import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import cyclistService from "../services/cyclists";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [n_dorsal, setDorsal] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateFields = () => {
    if (!rut || !name || !club || !n_dorsal || !password)
      return "Todos los campos son requeridos";

    if (name.length < 7)
      return "El nombre de usuario debe tener al menos 7 caracteres";

    if (club.length < 3)
      return "El nombre del club debe tener al menos 3 caracteres";

    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";

    if (isNaN(Number(n_dorsal)))
      return "El número de dorsal debe ser numérico";

    if (rut.length < 8)
      return "El RUT debe tener al menos 8 dígitos (sin puntos ni guion)";

    return null;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    try {
      const newCyclist = {
        rut,
        name,
        club,
        n_dorsal: Number(n_dorsal),
        password,
      };

      await cyclistService.create(newCyclist);
      setSuccessMessage("Cuenta creada con éxito, ahora puedes iniciar sesión");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      const msg =
        error.response?.data?.error ||
        "Error al registrar cuenta. Verifica tus datos.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, margin: "40px auto" }}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Crea tu cuenta ciclista
        </Typography>
        <form onSubmit={handleRegister}>
          <Stack spacing={2}>
            <TextField
              label="RUT"
              variant="outlined"
              fullWidth
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              helperText="Ejemplo: 15892044 (sin puntos ni guion)"
              data-testid="rut"
              required
            />
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="Mínimo 7 caracteres"
              data-testid="username"
              required
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Debe tener al menos 6 caracteres"
              data-testid="password"
              required
            />
            <TextField
              label="Club"
              variant="outlined"
              fullWidth
              value={club}
              onChange={(e) => setClub(e.target.value)}
              helperText="Mínimo 3 caracteres"
              data-testid="club"
              required
            />
            <TextField
              label="Número de dorsal"
              variant="outlined"
              fullWidth
              type="number"
              value={n_dorsal}
              onChange={(e) => setDorsal(e.target.value)}
              helperText="Debe ser un número único"
              data-testid="n_dorsal"
              required
            />

            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Registrar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/login")}
              >
                Volver
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
