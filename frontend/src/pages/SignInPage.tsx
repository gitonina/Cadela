import {
  Stack,
  Typography,
  Paper,
  Button,
  Alert,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import cyclistService from "../services/cyclists";
import { useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Link } from "@mui/material";
import FormInput from "../components/ui/FormInput";
import GroupsIcon from '@mui/icons-material/Groups';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function SignInPage() {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [n_dorsal, setDorsal] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setRut("15000222k");
    setName("Marco Antonio Solis");
    setPassword("password");
    setClub("Mexico Cycling");
    setDorsal("300");
  }, [])

  const validateFields = () => {
    if (!rut || !name || !club || !n_dorsal || !password)
      return "Todos los campos son requeridos";

    if (rut.length < 8)
      return "El RUT debe tener al menos 8 dígitos (sin puntos ni guion)";

    if (name.length < 7)
      return "El nombre de usuario debe tener al menos 7 caracteres";

    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";

    if (club.length < 3)
      return "El nombre del club debe tener al menos 3 caracteres";

    if (isNaN(Number(n_dorsal)))
      return "El número de dorsal debe ser numérico";

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
    <Box sx={{ position: "relative"}}>
      <Paper elevation={7}>
        <Stack sx={{ 
          height: 550,
          margin: 10, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <Typography gutterBottom fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
            Crea tu cuenta ciclista
          </Typography>
          <form onSubmit={handleRegister}>
            <Stack sx={{
              gap: 1.2,
              alignItems: "center"
            }}>

              <FormInput 
                placeholder="RUT*"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                icon={<FingerprintIcon sx={{ color: '#666', fontSize: 23 }} />}
                helper="Ejemplo: 15000111k (sin puntos ni guion)"
                type="rut"
                data-testid="rut"
              />

              <FormInput 
                placeholder="Usuario*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<PersonIcon sx={{ color: '#666', fontSize: 23 }} />}
                helper="Mínimo 7 caracteres"
                data-testid="username"
              />

              <FormInput 
                placeholder="Contraseña*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock sx={{ color: '#666', fontSize: 23 }} />}
                helper="Debe tener al menos 6 caracteres"
                type="password"
                data-testid="password"
              />

              <FormInput 
                placeholder="Club*"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                icon={<GroupsIcon sx={{ color: '#666', fontSize: 23 }} />}
                helper="Mínimo 3 caracteres"
                data-testid="club"
              />

              <FormInput 
                placeholder="Número de dorsal*"
                value={n_dorsal}
                onChange={(e) => setDorsal(e.target.value)}
                icon={<NumbersIcon sx={{ color: '#666', fontSize: 23 }} />}
                helper="Debe ser un número único"
                type="numeric"
                data-testid="n_dorsal"
              />

              <Button type="submit" variant="contained" sx={{ backgroundColor: '#dc2626', mt: 1}}>
                Crear Cuenta
              </Button>
            </Stack>
          </form>
        </Stack>  
      </Paper>
      <Box sx={{
        position: "absolute",
        top: 570,
        left: -100,
        right: -100,
        height: 80,
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </Box>
    </Box>
  );
}
