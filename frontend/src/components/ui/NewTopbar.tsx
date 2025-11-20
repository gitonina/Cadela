import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FlexRow from "./FlexRow";
import TopBarButton from "./TopBarButton";
import HomeButton from "./HomeButton";

const NewTopBar = () => {
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
          <TopBarButton text="Calendario" />
          <TopBarButton text="Resultados" />
          <TopBarButton text="Admin" />
        </FlexRow>

        <FlexRow gap={2}>
          {true ? (
            <>
              <PersonIcon sx={{ pb: 0.1 }}/>  
              <Typography variant="body1" sx={{ alignSelf: "center" }}>
                Esteban
              </Typography>
              <Button color="inherit" onClick={() => {}}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => {}}>
              Iniciar sesión
            </Button>
          )}
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};

export default NewTopBar