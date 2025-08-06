// pages/index.tsx
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { StudentDialog, StudentTable } from "./Components";
import { Spinner } from "../../Components";
import { fetchEducatorStudents } from "../../features/educator/thunks";

export const EducatorStudents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: students, loading, error } = useSelector(
    (state: RootState) => state.educator.educatorStudents
  );

  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEducatorStudents(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      {loading && <Spinner />}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {!loading && students && (
        <>
          <StudentTable data={students} onSelect={setSelectedStudent} />
          <StudentDialog
            open={!!selectedStudent}
            onClose={() => setSelectedStudent(null)}
            student={selectedStudent}
          />
        </>
      )}
    </Box>
  );
};
