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
import { memo } from "react";
import type { ScheduledClass } from "../types";

interface Props {
  scheduledClasses: ScheduledClass[];
}

const ScheduledClassesComponent = ({ scheduledClasses }: Props) => {
  if (!scheduledClasses || scheduledClasses.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Scheduled Classes</Typography>
        <Typography variant="body2" color="text.secondary">
          No upcoming classes scheduled.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>Scheduled Classes</Typography>
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
          {scheduledClasses.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{dayjs(cls.scheduled_at).format("MMM D, YYYY h:mm A")}</TableCell>
              <TableCell>{cls.educator?.user?.name || "N/A"}</TableCell>
              <TableCell>{cls.course?.title || "N/A"}</TableCell>
              <TableCell>{cls.discussion_topics || "—"}</TableCell>
              <TableCell>
                <Button size="small" color="warning" sx={{ mr: 1 }}>
                  Postpone
                </Button>
                <Button size="small" color="success">
                  Prepend
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export const ScheduledClasses = memo(ScheduledClassesComponent)