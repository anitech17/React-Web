// pages/index.tsx
import { Box } from "@mui/material";
import { useState } from "react";
import { StudentDialog, StudentTable } from "./Components";

export const EducatorStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <StudentTable onSelect={setSelectedStudent} />
      <StudentDialog
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
      />
    </Box>
  );
};