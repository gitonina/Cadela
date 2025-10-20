import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from "react-router-dom";

export default function CadelaAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <DirectionsBikeIcon sx={{ color: "white", fontSize: 32 }} />
        </IconButton>
        <Box
          onClick={() => navigate("/")}
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
      </Toolbar>
    </AppBar>
  );
}
