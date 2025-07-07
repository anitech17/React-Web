// --- components/ComingTests.tsx ---
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const ComingTests = ({ tests, onView }: { tests: any[], onView: (test: any) => void }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
    <Typography variant="h6" mb={2}>Upcoming Tests</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Subject</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tests.map((test) => (
          <TableRow key={test.id} hover onClick={() => onView(test)} sx={{ cursor: 'pointer' }}>
            <TableCell>{test.subject}</TableCell>
            <TableCell>{test.date}</TableCell>
            <TableCell>{test.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);