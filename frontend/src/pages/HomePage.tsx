import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ActiveCyclingRaceCard from "../components/ActiveCyclingRaceCard";
import Button from "@mui/material/Button";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { CircularProgress } from "@mui/material";
import Topbar from "../components/Topbar";
import { useCyclingRacesStore } from "../stores/cyclingRacesStore";

export default function HomePage() {
  const { nextRace, fetchNextRace ,isLoading} = useCyclingRacesStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveRace = async () => {
      try {
        await fetchNextRace();
      } catch (error) {
        console.error("Error fetching active race:", error);
      }
    };
    fetchActiveRace();
  }, []);

  return (
    <>
      <Topbar />
      <Box sx={{ textAlign: "center", alignItems: "center",justifyContent: "center", py: 8 }}>
        {/* Hero Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <DirectionsBikeIcon sx={{ fontSize: 48, color: "secondary.main" }} />
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            color="secondary.main"
          >
            CICLISMO CADELA
          </Typography>
        </Stack>

        <Typography
          variant="h5"
          color="secondary.light"
          sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
        >
          Participa en las mejores carreras de ciclismo de Santiago
        </Typography>

        <Typography variant="h6" color="secondary.light" sx={{ mb: 6 }}>
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
          ) : nextRace ? (
            <ActiveCyclingRaceCard race={nextRace} />
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
            color="primary"
            size="large"
            sx={{ mt: 4, margin: 2 }}
            onClick={() => navigate("/calendar")}
          >
            Ver calendario de carreras
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4, margin: 2 }}
            onClick={() => navigate("/results")}
          >
            Ver resultados de carreras previas
          </Button>
        </Stack>
      </Box>
    </>
  );
}
