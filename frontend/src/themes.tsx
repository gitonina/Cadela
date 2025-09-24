import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff', // Pink/Red
    },
    success: {
      main: '#2e7d32', // Green
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    info: {
      main: '#1976d2', // Blue
      light: '#42a5f5',
    },
    // You can customize other colors too
    background: {
      default: '#1c3e90',
      paper: '#ffffff',
    },
    
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 600,
    },
  },
});

export default theme;