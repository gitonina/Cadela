import { useEffect, useState } from "react";
import type { Inscription, InscriptionForm } from "../types/inscription";
import type { SelectChangeEvent } from "@mui/material";
import type { Category } from "../types/categories";
import categoriesService from "../services/categories";

import {
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

import inscriptionService from "../services/inscriptions";

const InscriptionForm = ( {cyclistId, cyclingRaceId} : {cyclistId : string, cyclingRaceId : string} ) => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await categoriesService.getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  
  const [form, setForm] = useState<InscriptionForm>({
    categoryId: ""
  });

  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  const handleInscriptions = () => {
    inscriptionService.getAllInscriptions().then((allInscriptions) => {
      setInscriptions(allInscriptions);
    })
  }
  useEffect(handleInscriptions, []);

  const onSelectChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setForm(prev => ({
      ...prev,
      categoryId: value
    }));
    console.log(form);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newInscription = await inscriptionService.createInscription({
      cyclistId,
      cyclingRaceId,
      categoryId: form.categoryId
    });
    setForm({
      categoryId: ""
    });
    setInscriptions([...inscriptions, newInscription]);
  };
    
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
          <FormControl required>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={form.categoryId}
              label="Categoría *"
              onChange={onSelectChange}
              name="categoryId"
            >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Inscribirse
          </Button>
        </Box>
        <Typography variant='h6' sx={{ mt: 2 }}>
          Ciclistas Inscritos:
        </Typography>
      </Paper>
    </Container>
  );
};

export default InscriptionForm;