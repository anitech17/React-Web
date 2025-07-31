// --- components/CompletedClasses.tsx ---
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
  completedClasses: ScheduledClass[];
  onCommentClick: (id: string) => void;
}

export const CompletedClasses = ({
  completedClasses,
  onCommentClick,
}: Props) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>
      Completed Classes
    </Typography>

    {completedClasses.length === 0 ? (
      <Typography variant="body2" color="text.secondary">
        No classes completed yet.
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
          {completedClasses.map((cls) => (
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
                  onClick={() => onCommentClick(cls.id)}
                  variant="outlined"
                >
                  Add Comment
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Paper>
);
