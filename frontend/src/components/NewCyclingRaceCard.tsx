import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CalendarToday } from "@mui/icons-material";
import { DirectionsBike } from "@mui/icons-material";
import { Terrain } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";

import type { CyclingRace } from "../types/cyclingRace";
import { formatDateString } from "../utils/dates";

const NewCyclingRaceCard = ({ race }: { race: CyclingRace }) => {
  return (
    <Card sx={{ width: 700, display: "flex" }}>

      <Box sx={{ width: '33%', position: 'relative' }}>
        <CardMedia sx={{ height: 190 }} image={race.circuitId.pathPhoto} />      
      </Box>

      <Box sx={{ width: '67%', display: 'flex', flexDirection: 'column', padding: 2 }}>

        <Box sx={{ display: 'flex', mb: 1 }}>
          <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatDateString(race.date)}
          </Typography>
        </Box>

        <Typography fontWeight="bold" sx={{ fontSize: 20, textAlign: "left" }}>
          {race.circuitId.name}
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
          <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {race.circuitId.location}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsBike sx={{ fontSize: 24, mr: 1, color: 'primary.main' }} />
            <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "left" }}>
              <Typography fontWeight="bold" sx={{ fontSize: 15, mb: 0, pb: 0 }}>
                {race.circuitId.distance} km
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Distancia
              </Typography>
            </Box>
          </Box>

          {/* Desnivel */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Terrain sx={{ fontSize: 24, mr: 1, color: 'error.main' }} />
            <Box>
              <Typography fontWeight="bold" sx={{ fontSize: 15, textAlign: "left", mb: 0, pb: 0 }}>
                {race.circuitId.elevationGain} m
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Desnivel
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NewCyclingRaceCard;
