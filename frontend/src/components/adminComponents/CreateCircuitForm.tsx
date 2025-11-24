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
import React, { useEffect, useState } from "react";
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
      <Box sx={{ position: "relative"}} component="form" onSubmit={handleSubmit}>
        <Paper elevation={7}>
          <Stack sx={{ 
            height: 350,
            mt: 5,
            mb: 5, 
            ml: 10,
            mr: 10,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            gap: 2
          }}>
            <Typography gutterBottom fontWeight="bold" variant="h5" sx={{ mb: 0 }}>
              Crear Nuevo Circuito
            </Typography>

            <TextField
              label="Nombre del Circuito"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              data-testid="circuit_name"
            />
            <TextField
              label="Distancia (km)"
              name="distance"
              type="number"
              value={formData.distance}
              onChange={handleChange}
              required
              fullWidth
              data-testid="distance"
            />
            <TextField
              label="Elevación (m)"
              name="elevationGain"
              type="number"
              value={formData.elevationGain}
              onChange={handleChange}
              required
              fullWidth
              data-testid="elevation"
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
              sx={{ backgroundColor: '#dc2626' }}
            >
              Crear Circuito
            </Button>

          </Stack>  
        </Paper>
        <Box sx={{
          position: "absolute",
          top: 360,
          left: -100,
          right: -100,
          height: 80,
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert severity="success" onClose={() => setSuccess(false)}>¡Circuito creado exitosamente!</Alert>}
        </Box>
      </Box>
  );
}
