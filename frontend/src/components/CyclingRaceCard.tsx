import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DirectionsBike } from "@mui/icons-material";
import { Terrain } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";


import type { CyclingRace } from "../types/cyclingRace";
import { formatDateString } from "../utils/dates";
import { Stack } from "@mui/material";

const CyclingRaceCard = ({ race }: { race: CyclingRace }) => {
  return (
    <Card sx={{ width: 500 }}>
      <CardMedia sx={{ height: 180 }} image={race.circuitId.pathPhoto} />
      <CardContent sx={{padding: 2.3}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            placeItems: "flex-start",
            mx: 0.5,
          }}
        >

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
            gap={1}
          >
            <EventIcon sx={{ mr: 0.5, color: "#ad9090ff", fontSize: 30 }} />
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold" sx={{  fontSize: 17}}>
              {formatDateString(race.date)}
            </Typography>
          </Stack>

          <Typography fontWeight="bold" sx={{ fontSize: 24 }}>
            {race.circuitId.name}
          </Typography>
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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsBike sx={{ fontSize: 60, mr: 1, color: 'primary.main' }} />
              <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "left" }}>
                <Typography fontWeight="bold" sx={{ fontSize: 24, mb: 0, pb: 0 }}>
                  {race.circuitId.distance} km
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 16 }}>
                  Distancia
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Terrain sx={{ fontSize: 70, mr: 1, color: 'error.main' }} />
              <Box>
                <Typography fontWeight="bold" sx={{ fontSize: 24, textAlign: "left", mb: 0, pb: 0 }}>
                  {race.circuitId.elevationGain} m
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 16 }}>
                  Desnivel
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CyclingRaceCard;
