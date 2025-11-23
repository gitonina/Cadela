import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { CyclingRaceResult } from "../types/cyclingRaceResults";

interface ResultsTableProps {
  raceResults: CyclingRaceResult[];
  category: string;
}

export default function ResultsTable({ raceResults, category }: ResultsTableProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        Categoría {category}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Lugar
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                N°
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Club</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {raceResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell align="center">{result.placement}</TableCell>
                <TableCell align="center">{result.inscriptionId.cyclistId.n_dorsal}</TableCell>
                <TableCell>{result.inscriptionId.cyclistId.name}</TableCell>
                <TableCell>{result.inscriptionId.cyclistId.club}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
