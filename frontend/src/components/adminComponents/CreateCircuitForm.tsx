import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function CreateCircuitForm() {
  const [formData, setFormData] = useState({
    name: "",
    distance: "",
    elevationGain: "",
    gpxFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nuevo Circuito
      </Typography>
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
          <Button type="submit" variant="contained" size="large" fullWidth>
            Crear Circuito
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
