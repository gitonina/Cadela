import { Container } from '@mui/material'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <Container maxWidth="md">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Container>
  )
}

export default App
