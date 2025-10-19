import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ResultsTable from "../components/ResultsTable";
import type { CyclingRaceResults } from "../types/cyclingRaceResults";
import CyclingRaceCard from "../components/CiclyngRaceCard";
import type { CyclingRace } from "../types/cyclingRace";
import { getRaceById } from "../services/cyclingRaces";

export default function ResultsPage() {
  const { raceId } = useParams<{ raceId: string }>();
  const [cyclingRace, setCyclingRace] = useState<CyclingRace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRace = async () => {
      if (raceId) {
        try {
          setIsLoading(true);
          const raceData = await getRaceById(Number(raceId));
          setCyclingRace(raceData);
        } catch (error) {
          console.error("Error fetching race data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRace();
  }, [raceId]);

  const results: CyclingRaceResults[] = [
    {
      id: "1",
      category: "Master 'C'",
      placements: [
        {
          id: "2",
          club: "Colo Colo",
          fullname: "Pedro González",
          dorsalnumber: "7",
          place: 1,
          is_mv: false,
        },
        {
          id: "5",
          club: "Universidad de Chile",
          fullname: "Juan Pérez",
          dorsalnumber: "12",
          place: 2,
          is_mv: false,
        },
      ],
    },
    {
      id: "2",
      category: "Amateur",
      placements: [
        {
          id: "2",
          club: "Colo Colo",
          fullname: "Pedro González",
          dorsalnumber: "7",
          place: 1,
          is_mv: false,
        },
        {
          id: "5",
          club: "Universidad de Chile",
          fullname: "Juan Pérez",
          dorsalnumber: "12",
          place: 2,
          is_mv: false,
        },
      ],
    },
    {
      id: "3",
      category: "Damas Master",
      placements: [
        {
          id: "2",
          club: "Colo Colo",
          fullname: "Pedro González",
          dorsalnumber: "7",
          place: 1,
          is_mv: false,
        },
        {
          id: "5",
          club: "Universidad de Chile",
          fullname: "Juan Pérez",
          dorsalnumber: "12",
          place: 2,
          is_mv: false,
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!cyclingRace) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>No se encontró la carrera.</Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{ mt: 1 }}
        >
          Inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        startIcon={<HomeIcon />}
        sx={{ mb: 3 }}
      >
        Inicio
      </Button>

      <Box
        sx={{
          mb: 4,
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CyclingRaceCard race={cyclingRace} />
      </Box>

      {/* Results Tables */}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {results && (
          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
            width="80vw"
          >
            {results.map((result) => (
              <Paper
                key={result.id}
                elevation={3}
                sx={{
                  mb: 4,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <ResultsTable raceResults={result} />
              </Paper>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
