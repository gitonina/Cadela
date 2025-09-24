import { Container } from '@mui/material'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'

function App() {
  return (
    <Container maxWidth="md">

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Container>
  )
}

export default App
