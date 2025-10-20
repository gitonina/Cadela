import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";

export default function CreateCyclingRaceForm() {
  const [formData, setFormData] = useState({
    circuit: "",
    date: dayjs(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue: any) => {
    setFormData((prevState) => ({
      ...prevState,
      date: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Carrera
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Circuito"
            name="name"
            value={formData.circuit}
            onChange={handleChange}
            required
            fullWidth
          />
          <DatePicker
            label="Fecha de la carrera"
            name="date"
            value={formData.date}
            onChange={handleDateChange}
          />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Crear Carrera
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
