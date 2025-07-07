// components/TestPerformance.tsx
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const TestPerformance = ({ scores }: { scores: { subject: string, date: string, score: number }[] }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Test Performance</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Subject</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scores.map((test, idx) => (
          <TableRow key={idx}>
            <TableCell>{test.subject}</TableCell>
            <TableCell>{test.date}</TableCell>
            <TableCell align="right">{test.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);