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
import type { CyclingRaceResult } from "../types/cyclingRaceResults";
import CyclingRaceCard from "../components/CyclingRaceCard";
import type { CyclingRace } from "../types/cyclingRace";
import cyclingRacesService from "../services/cyclingRaces";
import resultsService from "../services/results";

export default function ResultsPage() {
  const { raceId } = useParams<{ raceId: string }>();
  const [cyclingRace, setCyclingRace] = useState<CyclingRace | null>(null);
  const [results, setResults] = useState<CyclingRaceResult[] | null>(null);
  const [isRaceLoading, setIsRaceLoading] = useState<boolean>(true);
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRace = async () => {
      if (raceId) {
        try {
          setIsRaceLoading(true);
          const raceData = await cyclingRacesService.getRaceById(raceId);
          setCyclingRace(raceData);
        } catch (error) {
          console.error("Error fetching race data:", error);
        } finally {
          setIsRaceLoading(false);
        }
      }
    };

    const fetchRaceResults = async () => {
      if (raceId) {
        try {
          setIsResultsLoading(true);
          const resultsData = await resultsService.getResultsByRaceId(raceId);
          setResults(resultsData);
        } catch (error) {
          console.error("Error fetching race results:", error);
        } finally {
          setIsResultsLoading(false);
        }
      }
    };

    fetchRace();
    fetchRaceResults();
  }, [raceId]);

  if (isRaceLoading) {
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

  if (!results) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>No hay resultados disponibles para esta carrera.</Typography>
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

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const categoryName = result.inscriptionId.categoryId.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(result);
    return acc;
  }, {} as Record<string, CyclingRaceResult[]>);

  // Sort categories alphabetically
  const categories = Object.keys(groupedResults).sort();

  return (
    <Box sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/results"
        variant="outlined"
        startIcon={<HomeIcon />}
        sx={{ mb: 3 }}
      >
        Volver a Resultados
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
      {isResultsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
              {categories.map((categoryName) => (
                <Paper
                  key={categoryName}
                  elevation={3}
                  sx={{
                    mb: 4,
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <ResultsTable raceResults={groupedResults[categoryName]} category={categoryName} />
                </Paper>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
}
