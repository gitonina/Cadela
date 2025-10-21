import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import circuitsService from "../../services/circuits";
import type { CircuitCreate } from "../../types/circuit";

export default function CreateCircuitForm() {
  const [formData, setFormData] = useState({
    name: "",
    distance: "",
    elevationGain: "",
    gpxFile: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    console.log("Submitting:", formData);

    try {
      await circuitsService.createCircuit({
        name: formData.name,
        distance: Number(formData.distance),
        elevationGain: Number(formData.elevationGain),
      } as CircuitCreate);

      // Clear form after success
      setFormData({
        name: "",
        distance: "",
        elevationGain: "",
        gpxFile: null,
      });

      setSuccess(true);
      console.log("Cycling race created successfully");
    } catch (error: any) {
      console.error("Error creating cycling race:", error);
      setError(error.response?.data?.error || "Error al crear la carrera");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nuevo Circuito
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
          <TextField
            label="Nombre del Circuito"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Distancia (km)"
            name="distance"
            type="number"
            value={formData.distance}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Elevación (m)"
            name="elevationGain"
            type="number"
            value={formData.elevationGain}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Creando..." : "Crear Circuito"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
