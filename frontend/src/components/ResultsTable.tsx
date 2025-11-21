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
}

export default function ResultsTable({ raceResults }: ResultsTableProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        Categoría {raceResults.category}
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
            {raceResults.placements.map((result) => (
              <TableRow key={result.id}>
                <TableCell align="center">{result.place}</TableCell>
                <TableCell align="center">{result.dorsalnumber}</TableCell>
                <TableCell>{result.fullname}</TableCell>
                <TableCell>{result.club}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
