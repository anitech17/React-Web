// --- components/CompletedClasses.tsx ---
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export const CompletedClasses = ({ completedClasses, onCommentClick }: { completedClasses: any[], onCommentClick: (id: any) => void }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Completed Classes</Typography>
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
        {completedClasses.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>{cls.time}</TableCell>
            <TableCell>{cls.educator}</TableCell>
            <TableCell>{cls.subject}</TableCell>
            <TableCell>
              <Button size="small" onClick={() => onCommentClick(cls.id)}>Add Comment</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);