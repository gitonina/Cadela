import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
export default function Topbar() {
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
    navigate("/login");
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ mb: 2, width: "100%",
    left: 0,
    right: 0,}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h2"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <DirectionsBikeIcon sx={{ fontSize: 48}} />  
            CICLISMO CADELA
           

        </Typography>

        <Stack direction="row" spacing={2}>
          

          {user ? (
            <>
              <Typography variant="body1" sx={{ alignSelf: "center" }}>
                Hola, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                Registrarse
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
