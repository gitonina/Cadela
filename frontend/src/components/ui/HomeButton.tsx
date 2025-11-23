import FlexRow from "./FlexRow"
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <FlexRow cursor="pointer" onClick={() => navigate("/")}>
      <DirectionsBikeIcon sx={{ color: "white", fontSize: 42, m: 1 }} />
      <Box
        sx={{
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
    </FlexRow>
  );
}

export default HomeButton;