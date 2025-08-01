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
  NextClassScheduled,
  PersonalDetails,
  StudentManagement,
  NextTestScheduled,
} from "./Components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEducatorDashboard } from "../../features/educator/thunks";
import { Spinner } from "../../Components";

export const EducatorProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: educatorData,
    loading,
    error,
  } = useSelector((state: RootState) => state.educator.educatorDashboard);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEducatorDashboard(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      {loading && <Spinner />}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Educator Dashboard
        </Typography>
        <IconButton color="primary" onClick={() => navigate("/chat")}>
          <Badge badgeContent={1} color="error">
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {!educatorData ? (
        <Typography>No educator data found.</Typography>
      ) : (
        <>
          <PersonalDetails data={educatorData} />
          <Divider sx={{ my: 4 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <StudentManagement />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <NextTestScheduled data={educatorData.nextTest} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
              <NextClassScheduled data={educatorData.nextScheduledClass} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
