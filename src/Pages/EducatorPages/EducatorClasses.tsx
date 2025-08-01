// --- pages/index.tsx ---
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  CompletedClasses,
  ScheduleClassDialog,
  ScheduledClasses,
  RequestedClasses,
} from "./Components";
import { fetchEducatorClasses } from "../../features/educator/thunks";
import { Spinner } from "../../Components";

export const EducatorClasses = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.educator.educatorClasses
  );

  useEffect(() => {
    if (user.id) {
      dispatch(fetchEducatorClasses(user.id));
    }
  }, [dispatch, user.id]);

  // useCallback to avoid redefinition on each render
  const handleAccept = useCallback((id: string) => {
    console.log("Accept class:", id);
    // TODO: dispatch(acceptClassThunk(id))
  }, []);

  const handleDecline = useCallback((id: string) => {
    console.log("Decline class:", id);
    // TODO: dispatch(declineClassThunk(id))
  }, []);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Educator Classes</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Schedule Class
        </Button>
      </Box>

      {loading && <Spinner />}
      {error && <Typography color="error">{error}</Typography>}
      {data && (
        <>
          <ScheduledClasses scheduled={data.scheduled} />
          <Divider sx={{ my: 3 }} />
          <CompletedClasses completed={data.completed} />
          <Divider sx={{ my: 3 }} />
          <RequestedClasses
            requested={data.requested}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </>
      )}

      <ScheduleClassDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};
