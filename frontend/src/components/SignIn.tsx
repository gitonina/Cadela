import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";




export default function Signin() {
  return (
  
   
      <Stack spacing={3} sx={{ maxWidth: 600, margin: "40px auto" }}>
        

        <Alert severity="error">Error</Alert>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Crea tu cuenta Ciclista!
          </Typography>
          <form>
            <Stack spacing={2}>
             <TextField label="Rut" variant="outlined" fullWidth />
              <TextField label="Usuario" variant="outlined" fullWidth />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
              />
             <TextField label="Club" variant="outlined" fullWidth />
             <TextField label="Numero de dorsal" variant="outlined" fullWidth />

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary">
                  Entrar
                </Button>
                <Button variant="outlined" color="secondary">
                  Entrar como invitado
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Bienvenido, anonymous</Typography>
            <Button variant="outlined" color="secondary">
              Salir
            </Button>
          </Stack>
        </Paper>
      </Stack>
   
  );
}
