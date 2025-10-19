import { Container } from '@mui/material'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <Container maxWidth="md">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/results/:raceId" element={<ResultsPage />} />
      </Routes>
    </Container>
  )
}

export default App
