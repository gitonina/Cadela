import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CalendarToday } from "@mui/icons-material";
import { DirectionsBike } from "@mui/icons-material";
import { Terrain } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";

import type { CyclingRace } from "../types/cyclingRace";
import { formatDateString } from "../utils/dates";
import { useNavigate } from "react-router-dom";

type raceState = 'next' | 'active' | 'past'

const NewCyclingRaceCard = ({ race }: { race: CyclingRace }) => {
  const navigate = useNavigate();
  const raceDate = new Date(race.date);
  const todayDate = new Date(); 
  const diffDays = (raceDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
  const raceState: raceState = diffDays < 0 ? 'past' : diffDays <= 7 ? 'active' : 'next'
  return (
    <Card sx={{ width: 700, display: "flex", opacity: raceState === 'past' ? 0.85 : 1, }}>

      <Box sx={{ width: '33%', position: 'relative' }}>
        <CardMedia sx={{ height: 190 }} image={race.circuitId.pathPhoto} />
      </Box>

      <Box sx={{ width: '67%', display: 'flex', flexDirection: 'column', padding: 2, position: 'relative' }}>

        { raceState === 'active' ? 
          <Chip
            label="Inscripciones Abiertas"
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontWeight: 'bold',
              m: 1.5,
              borderRadius: 2,
              fontSize: 12
            }}
          /> : raceState === 'past' ? 
          <Chip
            label="Carrera ya finalizada"
            size="small"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontWeight: 'bold',
              m: 1.5,
              borderRadius: 2,
              fontSize: 12,
              backgroundColor: "#A3A3A3",
              color: "white"
            }}
          /> : <></>
        }

        <Box sx={{ display: 'flex', mb: 1 }}>
          <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatDateString(race.date)}
          </Typography>
        </Box>

        <Typography fontWeight="bold" sx={{ fontSize: 20, textAlign: "left" }}>
          {race.circuitId.name}
        </Typography>


        <Box sx={{ display: 'flex', alignContent: 'center',  mb: 1, mt: 1 }}>
          <LocationOn sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
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

        { raceState === 'active' ? 
          <Button
            variant="contained"
            color="primary"
            sx={{ 
              position: 'absolute',
              bottom: 0,
              right: 0,
              fontWeight: 'bold',
              fontSize: 11,
              m: 2,
              borderRadius: 2,
              backgroundColor: '#1F1885'
            }}
            onClick={() => navigate("/")}
          >
            Inscribirse
          </Button> : <></>
        }
      </Box>
    </Card>
  );
};

export default NewCyclingRaceCard;
