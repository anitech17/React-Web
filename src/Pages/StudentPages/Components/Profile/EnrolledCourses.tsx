import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import type { Enrollment } from "../types";
import { memo, useMemo } from "react";

interface Props {
  courses: Enrollment[];
}

const EnrolledCoursesComponent = ({ courses }: Props) => {
  if (!courses || courses.length === 0) return null;

  const formatDate = useMemo(
    () => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }),
    []
  );

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Enrolled Courses
      </Typography>

      <Box display="flex" gap={2} overflow="auto" pb={2}>
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{
              minWidth: 260,
              flexShrink: 0,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {course.course.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Subject: {course.course.subject}
              </Typography>

              <Typography variant="body2" my={1}>
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

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={2}
              >
                Enrolled On: {formatDate.format(new Date(course.enrolled_on))}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export const EnrolledCourses = memo(EnrolledCoursesComponent);