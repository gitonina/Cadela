import type { InscriptionData } from "../types/inscription";
import type { SelectChangeEvent } from "@mui/material";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

interface Props{
  form: InscriptionData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSelectChange: (event:SelectChangeEvent) => void;
}

const InscriptionForm = ({ form, onChange, onSubmit, onSelectChange }: Props) => {

  const categories = [
    "Intermedia(15 y 16 años)",
    "Junior(17 y 18 años)",
    "Todo competidor(19 años y más)",
    "Adultos A (18 años y más)",
    "Master (35 a 49 años)",
    "Master C (50 a 59 años)",
    "Master D (60 a 69 años)",
    "Master E (70 años y más)",
    "Amateur (18 años y más)",
    "Damas Adultos A (18 años y más)",
    "Damas Master (35 años y más)",
    "Federado JUNIOR",
    "Federado INTERMEDIA",
    "Federado ELITE/TODO COMPETIDOR",
    "Federado DAMAS"
  ]
    
  return (
    <Container maxWidth="sm"> 
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Rellena tus datos!
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Club"
            name="club"
            value={form.club}
            onChange={onChange}
            required
          />
          <TextField
            label="Nombre completo"
            name="fullname"
            value={form.fullname}
            onChange={onChange}
            required
          />
          <TextField
            label="Número de dorsal"
            name="dorsalnumber"
            value={form.dorsalnumber}
            onChange={onChange}
            required
          />
          <FormControl required>
            <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={form.category}
              label="Age *"
              onChange={onSelectChange}
              name="category"
            >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Inscribirse
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default InscriptionForm