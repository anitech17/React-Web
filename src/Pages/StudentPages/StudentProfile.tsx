// --- pages/index.tsx ---
import {
  Box,
  Grid,
  IconButton,
  Badge,
  Typography,
  Divider,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import {
  EnrolledCourses,
  LastTestResult,
  NextClassScheduled,
  NextTestScheduled,
  PersonalDetails,
  ProgressReportSummary,
} from "./Components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchStudentDashboard } from "../../features/student/thunks";
import { Spinner } from "../../Components";


export const StudentProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    data: studentData,
    error,
  } = useSelector((state: RootState) => state.student.studentDashboard);

  const user = useSelector((state: RootState) => state.auth?.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchStudentDashboard(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      {loading && <Spinner />}
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Student Dashboard
        </Typography>
        <IconButton color="primary" onClick={() => navigate("/chat")}>
          <Badge badgeContent={1} color="error">
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}
      {!studentData ? (
        <Typography>No student data found.</Typography>
      ) : (
        <>
          {/* Personal Info */}
          <PersonalDetails data={studentData} />
          <Divider sx={{ my: 4 }} />

          {/* Enrolled Courses */}
          <EnrolledCourses courses={studentData.enrolledCourses} />

          {/* Dashboard Grid */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <ProgressReportSummary />
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <NextClassScheduled data={studentData.nextScheduledClass} />
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <NextTestScheduled data={studentData.nextTest} />
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <LastTestResult data={studentData.lastTestPerformance} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
