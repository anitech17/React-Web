import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState, memo, useCallback } from "react";
import dayjs from "dayjs";
import type { EducatorStudentEnrollment } from "../types";

interface Props {
  data: EducatorStudentEnrollment[];
  onSelect: (student: EducatorStudentEnrollment) => void;
}

const StudentTableComponent = ({ data, onSelect }: Props) => {
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    return data.filter((s) =>
      s.student.user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const handleSelect = useCallback(
    (student: EducatorStudentEnrollment) => {
      onSelect(student);
    },
    [onSelect]
  );

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        Student List
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search students by name"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Enrolled On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student) => {
            const { user } = student.student;
            const { subject, class: courseClass } = student.course;

            return (
              <TableRow
                key={student.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleSelect(student)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{courseClass || "N/A"}</TableCell>
                <TableCell>{subject || "—"}</TableCell>
                <TableCell>{user.phone || "—"}</TableCell>
                <TableCell>
                  <Tooltip title={user.email}>
                    <span>{user.email.length > 20 ? user.email.slice(0, 20) + "..." : user.email}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{user.dob ? dayjs(user.dob).format("MMM D, YYYY") : "—"}</TableCell>
                <TableCell>{student.percent_complete ?? 0}%</TableCell>
                <TableCell>{dayjs(student.enrolled_on).format("MMM D, YYYY")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export const StudentTable = memo(StudentTableComponent);
