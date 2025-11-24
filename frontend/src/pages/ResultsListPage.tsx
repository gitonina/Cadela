import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ResultsList from "../components/ResultsList";

export default function ResultsListPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    > 
      <Typography
        color="white"
        variant="h4" 
        fontWeight="bold" 
        mt={5}
        mb={3} 
      >
        Resultados de Carreras
      </Typography>
      <Typography 
        color="white"
        variant="h6" 
        fontWeight="bold" 
        mb={3} 
      >
        Selecciona un mes para ver los resultados
      </Typography>
      <ResultsList />
      <Button
        onClick={() => navigate("/")}
        startIcon={<HomeIcon />}
        variant="contained"
        size="large"
        sx={{ 
          mt: 4, 
          backgroundColor: '#dc2626'
        }}
      >
        Inicio
      </Button>
    </Box>
  );
}
