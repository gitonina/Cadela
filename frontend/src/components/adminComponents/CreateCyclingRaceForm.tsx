import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Select,
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
import FormInput from "../ui/FormInput";
import PersonIcon from '@mui/icons-material/Person';


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
    <Box sx={{ position: "relative"}} component="form" onSubmit={handleSubmit}>
      <Paper elevation={7}>
        <Stack sx={{ 
          height: 300,
          mt: 5,
          mb: 5, 
          ml: 10,
          mr: 10,
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <Typography gutterBottom fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
            Crear Nueva Carrera
          </Typography>

          <FormControl
            sx={{ 
              width: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3
            }}
          >
            <Select
              value={formData.circuitId}
              onChange={handleSelectChange}
              disabled={isCircuitsLoading}
              displayEmpty
              sx={{
                backgroundColor:"white",
                padding: 0,
                width: 250,
                height: 50,
                textAlign: "left",
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar Circuito
              </MenuItem>
            
              {circuits.map((circuit) => (
                <MenuItem key={circuit.id} value={circuit.id}>
                  {circuit.name}
                </MenuItem>
              ))}
            </Select>

            <DatePicker
              label="Fecha de la carrera"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              sx={{
                '&.MuiInputBase-root': {
                  height: '30px',
                },
              }}
            />

            <Button type="submit" variant="contained" sx={{ backgroundColor: '#dc2626' }}>
              Crear Carrera
            </Button>
          </FormControl>
        </Stack>  
      </Paper>
      <Box sx={{
        position: "absolute",
        top: 320,
        left: -100,
        right: -100,
        height: 80,
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
        {success && <Alert severity="success" onClose={() => setSuccess(false)}>¡Carrera creada exitosamente!</Alert>}
      </Box>
    </Box>
  );
}



