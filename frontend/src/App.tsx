import { Box, Container } from "@mui/material";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import ResultsPage from "./pages/ResultsPage";
import AdminPage from "./pages/AdminPage";
import CadelaAppBar from "./components/AppBar";
import ResultsListPage from "./pages/ResultsListPage";
import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <Box>
      <CadelaAppBar />
      <Container sx={{ mt: 4, flex: 1 }}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/results" element={<ResultsListPage />} />
          <Route path="/results/:raceId" element={<ResultsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      </Container>
    </Box>
  );
}

export default App;
