// --- components/CompletedClasses.tsx ---
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const completedClasses = [
  { id: 1, time: "9:00 AM", subject: "English", educator: "Alex Johnson", type: "Live", topics: ["Grammar"] },
];

export const CompletedClasses = () => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Completed Classes</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Topics</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {completedClasses.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>{cls.time}</TableCell>
            <TableCell>{cls.subject}</TableCell>
            <TableCell>{cls.type}</TableCell>
            <TableCell>{cls.topics.join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);