import { Box, Container } from "@mui/material";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import ResultsPage from "./pages/ResultsPage";
import AdminPage from "./pages/AdminPage";
import ResultsListPage from "./pages/ResultsListPage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import NewTopBar from "./components/ui/NewTopbar";
import {ProtectedRoute} from "./components/ProtectedRoutes"
import { useEffect } from "react";
import loginService from "./services/login";
import { useAuthStore } from "./stores/authStore";


function App() {
  const { setUser } = useAuthStore();
  useEffect(() => {
    const init = async () => {
      const loggedUser = await loginService.restoreLogin();
      if (loggedUser) setUser(loggedUser);
    };
    init();
  }, []);

  return (
    <Box>
      <Container sx={{ mt: 4, flex: 1 }}>
        <NewTopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/results" element={<ResultsListPage />} />
          <Route path="/results/:raceId" element={<ResultsPage />} />
          <Route path="/admin" 
          element={
          <ProtectedRoute roles={["admin"]}>
          <AdminPage />
        </ProtectedRoute>
        } 
          
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
