// --- pages/index.tsx ---
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ComingTests, CompletedTests, TestDetailsDialog } from "./Components";

export const StudentTests = () => {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const upcomingTests = [
    {
      id: 1,
      subject: "Math",
      date: "July 15",
      time: "10:00 AM",
      invigilator: "Mr. Gupta",
      syllabus: "Algebra, Geometry",
      pattern: "Objective + Descriptive",
    },
  ];

  const finishedTests = [
    {
      id: 2,
      subject: "English",
      date: "June 30",
      time: "12:00 PM",
      score: 85,
      invigilator: "Ms. Sharma",
      syllabus: "Reading Comprehension, Essay Writing",
      pattern: "Essay and Short Answers",
      review: "Great writing skills. Keep practicing comprehension.",
    },
  ];

  const handleViewTest = (test: any, completed = false) => {
    setSelectedTest(test);
    setIsCompleted(completed);
    setDialogOpen(true);
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Tests
      </Typography>

      <ComingTests tests={upcomingTests} onView={(test: any) => handleViewTest(test, false)} />
      <CompletedTests tests={finishedTests} onView={(test: any) => handleViewTest(test, true)} />

      <TestDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        test={selectedTest}
        isCompleted={isCompleted}
      />
    </Box>
  );
};