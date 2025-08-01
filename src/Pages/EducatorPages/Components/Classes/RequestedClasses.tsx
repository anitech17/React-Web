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
import type { ScheduledClass } from "../types";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

interface Props {
  requested: ScheduledClass[];
  onAccept: (classId: string) => void;
  onDecline: (classId: string) => void;
}

const RequestedClassesComponent = ({
  requested,
  onAccept,
  onDecline,
}: Props) => {
  const formattedRequested = useMemo(
    () =>
      requested.map((cls) => ({
        ...cls,
        studentName: cls.student.user.name,
        subject: cls.course.title,
        formattedTime: dayjs(cls.scheduled_at).format("MMM D, YYYY h:mm A"),
        discussion: cls.discussion_topics || "—",
        status: cls.status.toLowerCase(),
      })),
    [requested]
  );

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Requested Classes
      </Typography>

      {requested.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No requested classes available.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell>Scheduled Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedRequested.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.studentName}</TableCell>
                <TableCell>{cls.subject}</TableCell>
                <TableCell>{cls.discussion}</TableCell>
                <TableCell>{cls.formattedTime}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {cls.status}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={() => onAccept(cls.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDecline(cls.id)}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export const RequestedClasses = memo(RequestedClassesComponent);
