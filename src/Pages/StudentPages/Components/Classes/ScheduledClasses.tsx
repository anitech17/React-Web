// --- components/ScheduledClasses.tsx ---
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export const ScheduledClasses = ({ scheduledClasses }: { scheduledClasses: any[] }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
    <Typography variant="h6" mb={2}>Scheduled Classes</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Educator</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scheduledClasses.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>{cls.time}</TableCell>
            <TableCell>{cls.educator}</TableCell>
            <TableCell>{cls.subject}</TableCell>
            <TableCell>
              <Button size="small" color="warning" sx={{ mr: 1 }}>Postpone</Button>
              <Button size="small" color="success">Prepend</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);
