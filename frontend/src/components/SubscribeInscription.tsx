import { useEffect, useState } from "react";
import  inscriptionService  from "../services/inscriptions";
import categoriesService from "../services/categories";
import type { Category } from "../types/categories";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { InscriptionCreate } from "../types/inscription";
import { useAuthStore } from "../stores/authStore";
import { useErrorStore } from "../stores/errorStore";


const SimpleSubscribeButton = ({ raceId }: { raceId: string }) => {
  const { user } = useAuthStore();
  const { setMessage, setAlert, setAlertType} = useErrorStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    };
    loadCategories();
  }, []);

  const callAlert = (message: string, alertType: 'error' | 'success') => {
    setMessage(message);
    setAlertType(alertType)
    setAlert(true);
  }

  const handleSubscribe = async () => {
    if (!user) {
      callAlert("Debes iniciar sesión para inscribirte", 'error');
      return;
    }

    if (!selectedCategory) {
      callAlert("Selecciona una categoría antes de inscribirte", 'error');
      return;
    }

    const payload : InscriptionCreate = {
      cyclistId: user.id,
      cyclingRaceId: raceId,
      categoryId: selectedCategory,
    };

    try {
      await inscriptionService.createInscription(payload);
      callAlert("Inscripción realizada con éxito", 'success');
    } catch (error) {
      callAlert(error!.toString(), 'error');
    }
  };

  
   if (!user) {
    return (
      <Stack
        direction="column"
        alignItems="center"
      >
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 14, textAlign: "center", mb: 0 }}>
          Debes iniciar sesión para inscribirte
        </Typography>
        <Button 
          variant="contained"
            sx={{ 
              backgroundColor: '#dc2626',
              mt: 2,
              mb: 3
            }}
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </Button>
      </Stack>
    );
  }

  return (
    <Stack 
      spacing={1.5} 
      direction="column" 
      alignItems="center"
      mb={1}
    >
      <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 14, textAlign: "center", mb: 0 }}>
        Selecciona la categoría de inscripción
      </Typography>

      <FormControl
        sx={{ 
          width: 350,
        }}
      >
        <Select
          id="demo-simple-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{
            backgroundColor:"white",
            padding: 0,
            width: 350,
            height: 40,
            textAlign: "left",
          }}
        >
          <MenuItem value="" disabled>
            Categoría no seleccionada
          </MenuItem>

          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained"
          sx={{ 
            backgroundColor: '#149c0fff',
            mt: '20px !important',
            mb: '20px !important',
          }}
        onClick={handleSubscribe}
      >
        Inscribirse
      </Button>

    </Stack>
  );
};

export default SimpleSubscribeButton;