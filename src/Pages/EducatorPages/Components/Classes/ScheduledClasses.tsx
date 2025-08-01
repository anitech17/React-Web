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
import { memo, useMemo } from "react";
import type { ScheduledClass } from "../types";
import dayjs from "dayjs";

interface Props {
  scheduled: ScheduledClass[];
}

const ScheduledClassesComponent = ({ scheduled }: Props) => {
  const formattedClasses = useMemo(() => {
    return scheduled.map((cls) => ({
      ...cls,
      formattedTime: dayjs(cls.scheduled_at).format("MMM D, YYYY h:mm A"),
    }));
  }, [scheduled]);

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>Scheduled Classes</Typography>

      {scheduled.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No upcoming classes scheduled.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedClasses.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.formattedTime}</TableCell>
                <TableCell>{cls.course.title}</TableCell>
                <TableCell>{cls.discussion_topics || "—"}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {cls.status}
                </TableCell>
                <TableCell>
                  <Button size="small" color="warning" sx={{ mr: 1 }}>
                    Postpone
                  </Button>
                  <Button size="small" color="success" sx={{ mr: 1 }}>
                    Prepend
                  </Button>
                  <Button size="small" color="primary">
                    Edit
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

export const ScheduledClasses = memo(ScheduledClassesComponent);
