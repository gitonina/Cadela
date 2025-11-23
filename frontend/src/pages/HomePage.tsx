import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NewActiveCyclingRaceCard from "../components/NewActiveCyclingRaceCard";
import Button from "@mui/material/Button";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";
import { CircularProgress } from "@mui/material";

export default function HomePage() {
  const [activeRace, setActiveRace] = useState<CyclingRace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveRace = async () => {
      try {
        setIsLoading(true);
        const nextRace = await cyclingRacesService.getNextRace();
        setActiveRace(nextRace);
      } catch (error) {
        console.error("Error fetching active race:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveRace();
  }, []);

  return (
    <>
      <Box sx={{ 
        textAlign: "center", 
        alignItems: "center",
        justifyContent: "center", 
        py: 6, 
      }}>
        <Stack
          direction="row"
          alignItems="left"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 1 }}
        >
          <DirectionsBikeIcon sx={{ fontSize: 48, color: "secondary.main" }} />
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            color="secondary.main"
          >
            CICLISMO CADELA
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          color="secondary.light"
          sx={{ m: 2, maxWidth: 700, mx: "auto" }}
        >
          Participa en las mejores carreras de ciclismo de Santiago
        </Typography>

        <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            color="secondary.main"
            margin={3}
          >
            PRÓXIMA CARRERA
          </Typography>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : activeRace ? (
            <NewActiveCyclingRaceCard race={activeRace} />
          ) : (
            <Typography variant="body1" color="text.secondary">
              No hay carreras programadas por el momento.
            </Typography>
          )}
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{ 
              mt: 4, 
              margin: 2,
              backgroundColor: '#dc2626'
            }}
            onClick={() => navigate("/calendar")}
          >
            Ver calendario de carreras
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              mt: 4, 
              margin: 2,
              backgroundColor: '#dc2626'
            }}
            onClick={() => navigate("/results")}
          >
            Ver resultados de carreras previas
          </Button>
        </Stack>
      </Box>
    </>
  );
}
