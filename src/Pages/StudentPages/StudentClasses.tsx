// --- pages/index.tsx ---
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CommentDialog, CompletedClasses, RequestClassDialog, ScheduledClasses } from "./Components";

export const StudentClasses = () => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [comment, setComment] = useState("");

  const scheduledClasses = [
    { id: 1, time: "10:00 AM", educator: "Mr. Smith", subject: "Math" },
    { id: 2, time: "12:00 PM", educator: "Ms. Johnson", subject: "English" },
  ];

  const completedClasses = [
    { id: 3, time: "9:00 AM", educator: "Dr. Green", subject: "Science" },
  ];

  const handleCommentClick = (id: any) => {
    setSelectedClassId(id);
    setOpenCommentDialog(true);
  };

  const handleSubmitComment = () => {
    console.log("Comment submitted:", comment, "for class ID:", selectedClassId);
    setOpenCommentDialog(false);
    setComment("");
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

      <ScheduledClasses scheduledClasses={scheduledClasses} />
      <CompletedClasses completedClasses={completedClasses} onCommentClick={handleCommentClick} />

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
