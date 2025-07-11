// --- components/ScheduledClasses.tsx ---
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const scheduledClasses = [
  { id: 1, time: "10:00 AM", subject: "Math", type: "Live", topics: ["Algebra"], educator: "Alex Johnson" },
  { id: 2, time: "12:00 PM", subject: "Science", type: "Doubt Session", topics: ["Thermodynamics"], educator: "Alex Johnson" },
];

export const ScheduledClasses = () => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
    <Typography variant="h6" mb={2}>Scheduled Classes</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Topics</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scheduledClasses.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>{cls.time}</TableCell>
            <TableCell>{cls.subject}</TableCell>
            <TableCell>{cls.type}</TableCell>
            <TableCell>{cls.topics.join(", ")}</TableCell>
            <TableCell>
              <Button size="small" color="warning" sx={{ mr: 1 }}>Postpone</Button>
              <Button size="small" color="success" sx={{ mr: 1 }}>Prepend</Button>
              <Button size="small" color="primary">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);