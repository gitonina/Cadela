import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useAuthStore } from "../stores/authStore";

export default function Topbar() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();

  const handleLogout = async () => {
    await loginService.logout();
    clearUser();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ mb: 2, width: "100%", left: 0, right: 0 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DirectionsBikeIcon sx={{ color: "white", fontSize: 42, m: 1 }} />
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.7rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                lineHeight: 1,
                textAlign: "left",
                ml: 0.5,
              }}
            >
              Ciclismo
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.05em",
                textAlign: "left",
                lineHeight: 1,
              }}
            >
              CADELA
            </Typography>
          </Box>
        </Box>

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
