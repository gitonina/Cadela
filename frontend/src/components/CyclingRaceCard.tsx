import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ToyoImage from "../assets/toyo.jpg";
import type { CyclingRace } from "../types/cyclingRace";

const CyclingRaceCard = (props: { race: CyclingRace }) => {
  const { race } = props;
  return (
    <Card sx={{ width: 600 }}>
      <CardMedia sx={{ height: 180 }} image={race.pathPhoto} />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 0.5,
          }}
        >
          <Typography fontWeight="bold" sx={{ fontSize: 29 }}>
            {race.name}
          </Typography>
          <Typography variant="h5">{race.date}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ml: 6,
            mr: 8,
            mt: 3,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {race.isRaceCircuit ? (
              <Typography color="grey" variant="h6">
                Distancia de Circuito
              </Typography>
            ) : (
              <Typography color="grey" variant="h6">
                Distancia
              </Typography>
            )}
            <Typography color="grey" variant="h4" fontWeight="bold">
              {race.distance} km
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {race.isRaceCircuit ? (
              <Typography color="grey" variant="h6">
                Desnivel positivo de Circuito
              </Typography>
            ) : (
              <Typography color="grey" variant="h6">
                Desnivel positivo
              </Typography>
            )}
            <Typography color="grey" variant="h4" fontWeight="bold">
              {race.elevationGain} m
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CyclingRaceCard;

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mx: 5,
    mt: 4,
    mb: 2,
  }}
>
  <Typography color="grey" variant="h4" fontWeight="bold">
    100
  </Typography>
  <Typography color="grey" variant="h4" fontWeight="bold">
    20
  </Typography>
</Box>;
