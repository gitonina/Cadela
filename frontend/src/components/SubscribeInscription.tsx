import { useEffect, useState } from "react";
import  inscriptionService  from "../services/inscriptions";
import loginService from "../services/login";
import categoriesService from "../services/categories";
import type { Category } from "../types/categories";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { InscriptionCreate } from "../types/inscription";
import type { Cyclist } from "../types/cyclist";


const SimpleSubscribeButton = ({ raceId }: { raceId: string }) => {
  const [user, setUser] = useState<Cyclist | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      setUser(loggedUser);
    };
    init();

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

  const handleSubscribe = async () => {
    if (!user) {
      alert("Debes iniciar sesión para inscribirte");
      return;
    }

    if (!selectedCategory) {
      alert("Selecciona una categoría antes de inscribirte");
      return;
    }

    const payload : InscriptionCreate = {
      cyclistId: user.id,
      cyclingRaceId: raceId,
      categoryId: selectedCategory,
    };

    try {
      await inscriptionService.createInscription(payload);
      alert("Inscripción creada con éxito ");
    } catch (error) {
      console.error(error);
      alert("Error al crear inscripción ");
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
            size="small"
            sx={{ 
              mt: 4, 
            
              backgroundColor: '#dc2626'
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
      <Typography  
        fontWeight="bold"
        color="text.secondary"
        sx={{
          mb: 0,
        }}
      >
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
            mt: '15px !important',

          }}
        onClick={handleSubscribe}
      >
        Inscribirse
      </Button>

    </Stack>
  );
};

export default SimpleSubscribeButton;