// --- pages/index.tsx ---
import {
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  CommentDialog,
  CompletedClasses,
  ScheduledClasses,
  RequestedClasses,
  RequestClassDialog,
} from "./Components";
import { fetchStudentClasses } from "../../features/student/thunks";
import { Spinner } from "../../Components";

export const StudentClasses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.student.studentClasses
  );

  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchStudentClasses(user.id));
    }
  }, [dispatch, user?.id]);

  const handleCommentClick = (id: any) => {
    setSelectedClassId(id);
    setOpenCommentDialog(true);
  };

  const handleSubmitComment = () => {
    console.log("Comment submitted:", comment, "for class ID:", selectedClassId);
    setOpenCommentDialog(false);
    setComment("");
  };

  const handleCancelRequest = (classId: string) => {
    console.log("Cancel request for class ID:", classId);
    // You will later dispatch cancelRequestThunk(classId) here
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          My Classes
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenRequestDialog(true)}>
          Request a Class
        </Button>
      </Box>

      {loading && <Spinner />}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <>
          <ScheduledClasses scheduledClasses={data.scheduled} />
          <Divider sx={{ my: 3 }} />
          <CompletedClasses completedClasses={data.completed} onCommentClick={handleCommentClick} />
          <Divider sx={{ my: 3 }} />
          <RequestedClasses
            requestedClasses={data.requested}
            onCancelRequest={handleCancelRequest}
          />
        </>
      )}

      <RequestClassDialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} />
      <CommentDialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        comment={comment}
        setComment={setComment}
        onSubmit={handleSubmitComment}
      />
    </Box>
  );
};
