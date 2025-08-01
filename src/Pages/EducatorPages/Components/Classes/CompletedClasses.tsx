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
import dayjs from "dayjs";
import { memo, useMemo } from "react";
import type { ScheduledClass } from "../types";

interface Props {
  completed: ScheduledClass[];
}

const CompletedClassesComponent = ({ completed }: Props) => {
  const formattedClasses = useMemo(
    () =>
      completed.map((cls) => ({
        ...cls,
        formattedTime: dayjs(cls.scheduled_at).format("MMM D, YYYY h:mm A"),
        discussion: cls.discussion_topics || "—",
        status: cls.status.toLowerCase(),
      })),
    [completed]
  );

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        Completed Classes
      </Typography>

      {completed.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No completed classes available.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedClasses.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.formattedTime}</TableCell>
                <TableCell>{cls.course.title}</TableCell>
                <TableCell>{cls.discussion}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {cls.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export const CompletedClasses = memo(CompletedClassesComponent);
