import { Button, Box } from "@mui/material";
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
      <ResultsList />
      <Button
        onClick={() => navigate("/")}
        variant="outlined"
        startIcon={<HomeIcon />}
        sx={{ m: 5 }}
      >
        Inicio
      </Button>
    </Box>
  );
}
