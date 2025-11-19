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
  Stack
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
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Button 
          variant="outlined" 
          onClick={() => navigate('/login')}
          sx={{ margin: 1, width: 200 }}
        >
          Inicia sesión
        </Button>
      </Stack>
    );
  }
  return (
    <Stack 
      spacing={2} 
      direction="column" 
      alignItems="center"
    >
      <FormControl
        sx={{ 
          width: 400,
        }}
      >
        <InputLabel 
          id="category-label"
          sx={{ 
            textAlign: "center",
          }}
        > Categoría
        </InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Categoría"
          size="small"
          sx={{ 
            height: 50,
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        onClick={handleSubscribe}
        sx={{ 
          height: 45,
        }}
      >
        Inscribirse
      </Button>
    </Stack>
  );
};

export default SimpleSubscribeButton;