// --- components/RequestedClasses.tsx ---
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
import dayjs from "dayjs";
import type { ScheduledClass } from "../types";

interface Props {
  requestedClasses: ScheduledClass[];
  onCancelRequest: (id: string) => void;
}

export const RequestedClasses = ({
  requestedClasses,
  onCancelRequest,
}: Props) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
    <Typography variant="h6" mb={2}>
      Requested Classes
    </Typography>

    {requestedClasses.length === 0 ? (
      <Typography variant="body2" color="text.secondary">
        No class requests pending.
      </Typography>
    ) : (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Educator</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedClasses.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>
                {dayjs(cls.scheduled_at).format("MMM D, YYYY h:mm A")}
              </TableCell>
              <TableCell>{cls.educator.user.name}</TableCell>
              <TableCell>{cls.course.title}</TableCell>
              <TableCell>{cls.discussion_topics || "—"}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => onCancelRequest(cls.id)}
                >
                  Cancel Request
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Paper>
);
