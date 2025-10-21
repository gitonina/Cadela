import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import type { Circuit } from "../../types/circuit";
import circuitsService from "../../services/circuits";
import cyclingRacesService from "../../services/cyclingRaces";
import type { CyclingRaceCreate } from "../../types/cyclingRace";

export default function CreateCyclingRaceForm() {
  const [formData, setFormData] = useState({
    circuitId: "",
    date: dayjs(),
  });

  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [isCircuitsLoading, setIsCircuitsLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        setIsCircuitsLoading(true);
        const circuits = await circuitsService.getAllCircuits();
        setCircuits(circuits);
      } catch (error) {
        console.error("Error fetching circuits:", error);
      } finally {
        setIsCircuitsLoading(false);
      }
    };

    fetchCircuits();
  }, []);

  const handleSelectChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      circuitId: e.target.value,
    }));
  };

  const handleDateChange = (newValue: any) => {
    setFormData((prevState) => ({
      ...prevState,
      date: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    console.log("Submitting:", formData);

    try {
      await cyclingRacesService.create({
        circuitId: formData.circuitId,
        date: formData.date.toISOString(),
      } as CyclingRaceCreate);

      // Clear form after success
      setFormData({
        circuitId: "",
        date: dayjs(),
      });

      setSuccess(true);
      console.log("Cycling race created successfully");
    } catch (error) {
      console.error("Error creating cycling race:", error);
      setError("Error al crear la carrera");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Carrera
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(false)}
        >
          ¡Carrera creada exitosamente!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth required>
            <TextField
              value={formData.circuitId}
              label="Circuito"
              onChange={handleSelectChange}
              disabled={isCircuitsLoading}
              select
            >
              {circuits.map((circuit) => (
                <MenuItem value={circuit.id}>{circuit.name}</MenuItem>
              ))}
            </TextField>
          </FormControl>
          <DatePicker
            label="Fecha de la carrera"
            name="date"
            value={formData.date}
            onChange={handleDateChange}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Creando..." : "Crear Carrera"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
