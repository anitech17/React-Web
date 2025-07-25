// --- Components/EnrolledCourses.tsx ---
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import type { Enrollment } from "../types";

interface Props {
  courses: Enrollment[];
}

export const EnrolledCourses: React.FC<Props> = ({ courses }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Enrolled Courses
      </Typography>

      <Box display="flex" gap={2} overflow="auto" pb={2}>
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{ minWidth: 260, flexShrink: 0, boxShadow: 3 }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {course.course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Subject: {course.course.subject}
              </Typography>
              <Typography variant="body2" mb={1}>
                {course.course.description}
              </Typography>

              <Stack spacing={1}>
                <Typography variant="body2">
                  Progress: {course.percent_complete}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.percent_complete}
                />
              </Stack>

              <Typography variant="caption" color="text.secondary" mt={2} display="block">
                Enrolled On: {new Date(course.enrolled_on).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};