import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FlexRow from "./FlexRow";
import TopBarButton from "./TopBarButton";
import HomeButton from "./HomeButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import loginService from "../../services/login"

const NewTopBar = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const location = useLocation();

  const handleLogout = async () => {
    await loginService.logout();
    clearUser();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ 
        mb: 2, 
        width: "100%", 
        left: 0, 
        right: 0, 
        backgroundColor: '#dc2626'
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <FlexRow gap={3}>
          <HomeButton />
          <TopBarButton text="Calendario" onClick={() => navigate("/calendar")}/>
          <TopBarButton text="Resultados" onClick={() => navigate("/results")}/>
          <TopBarButton text="Admin" onClick={() => navigate("/admin")}/>
        </FlexRow>

        <FlexRow gap={2}>
          {user ? (
            <>
              <PersonIcon sx={{ pb: 0.1 }}/>  
              <Typography variant="body1" sx={{ alignSelf: "center" }}>
                Hola, {user.name}
              </Typography>
              <Button color="inherit" onClick={() => {handleLogout()}}>
                Cerrar sesión
              </Button>
            </>
          ) : location.pathname !== "/login" ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          ) : <></>}
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};

export default NewTopBar