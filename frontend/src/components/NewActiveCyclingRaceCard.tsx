import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { DirectionsBike } from "@mui/icons-material";
import { Terrain } from "@mui/icons-material";

import SubscribeButton from "./SubscribeInscription";
import type { CyclingRace } from "../types/cyclingRace";
import { formatDateString } from "../utils/dates";

export default function NewActiveCyclingRaceCard(props: { race: CyclingRace }) {
  const { race } = props;

  // Defensive check - if circuitId is not populated, don't render
  if (!race.circuitId) {
    console.error("Race circuitId is not populated:", race);
    return (
      <Typography color="error">
        Error: Los datos del circuito no están disponibles
      </Typography>
    );
  }

  return (
    <Card sx={{ width: 500 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={race.circuitId.pathPhoto}
        title={race.circuitId.name}
      />
      <CardContent>
        <Typography gutterBottom fontWeight="bold" variant="h5" sx={{ mt: 0 }}>
          {race.circuitId.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
          gap={1}
        >
          <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="subtitle1" color="text.secondary">
            {formatDateString(race.date)}
          </Typography>
        </Stack>
        
        <Stack direction="row" justifyContent="center" mb={0} gap={15}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsBike sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
            <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "left" }}>
              <Typography fontWeight="bold" sx={{ fontSize: 18, mb: 0, pb: 0 }}>
                {race.circuitId.distance} km
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 14 }}>
                Distancia
              </Typography>
            </Box>
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Terrain sx={{ fontSize: 40, mr: 1, color: 'error.main' }} />
            <Box>
              <Typography fontWeight="bold" sx={{ fontSize: 18, textAlign: "left", mb: 0, pb: 0 }}>
                {race.circuitId.elevationGain} m
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 14 }}>
                Desnivel
              </Typography>
            </Box>
          </Box>

        </Stack>
      </CardContent>
      <CardActions sx={{ flexDirection: "column", alignItems: "stretch" }}>
        <SubscribeButton raceId={race.id} />
      </CardActions>
    </Card>
  );
}
