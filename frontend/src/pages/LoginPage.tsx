import {
  Stack,
  Typography,
  Paper,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import rolesService from "../services/roles";
import { useAuthStore } from "../stores/authStore";
import { Lock } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "@mui/material";
import FormInput from "../components/ui/FormInput";

export default function LoginPage() {
  const { user, setUser, setRole } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) 
      navigate('/')
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ rut, password });
      const role = await rolesService.getRoleById(loggedUser.rolId);
      setRole(role);
      setUser(loggedUser);
      setRut("");
      setPassword("");
      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      const msg =
        error.response?.data?.error || "Credenciales incorrectas o servidor no disponible.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  if (user) {
    return (
      <Stack spacing={3}>
        <Alert severity="success">Has iniciado Sesión! {user.name}</Alert>
      </Stack>
    );
  }

  return (
    <Box sx={{ position: "relative"}}>
      <Paper elevation={7}>
        <Stack sx={{ 
          height: 300,
          margin: 10, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <Typography gutterBottom fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
            Iniciar sesión
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack sx={{
              gap: 2,
              alignItems: "center"
            }}>
              <FormInput
                placeholder="RUT*"
                value={rut}
                onChange={(e) => setRut(e.target.value)} 
                icon={<PersonIcon sx={{ color: '#666', fontSize: 23 }}/>} 
                data_testid="rut"
              />

              <FormInput
                placeholder="Contraseña*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock sx={{ color: '#666', fontSize: 23 }} />} 
                type="password"
                data_testid="password"
              />

              <Button type="submit" variant="contained" sx={{ backgroundColor: '#dc2626' }}>
                Iniciar sesión
              </Button>
            </Stack>
          </form>

          <Typography gutterBottom variant="body2" color="text.secondary" sx={{ mt: 2.5, mb: 0 }}>
            ¿No tienes una cuenta?{' '}
            <Link 
              component="button"
              variant="body2"
              onClick={() => navigate('/sign-in')}
              underline="hover"
              sx={{ 
                color: '#1976d2',
                fontWeight: 600,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Stack>  
      </Paper>

      <Box sx={{
        position: "absolute",
        top: 315,
        left: -100,
        right: -100,
        height: 80,
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Box>
  );
}
