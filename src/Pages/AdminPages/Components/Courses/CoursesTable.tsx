import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useState, useCallback, memo, useEffect } from "react";
import type { Course } from "../../../../Pages/AdminPages/Components/types";
import type { SelectChangeEvent } from "@mui/material";
import { useDebounce } from "../../../../hooks";

interface CoursesTableProps {
  courses: Course[];
  onEdit: (courseId: string) => void;
  onDelete: (courseId: string) => void;
  onViewSyllabus: (courseId: string) => void;
  onSearchChange: (value: string) => void;
  onClassFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  page: number;
  limit: number;
  total: number;
}

const CoursesTableComponent = ({
  courses,
  onEdit,
  onDelete,
  onViewSyllabus,
  onSearchChange,
  onClassFilterChange,
  onPageChange,
  onLimitChange,
  page,
  limit,
  total,
}: CoursesTableProps) => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 700);
  const [classFilter, setClassFilter] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
    },
    []
  );

  useEffect(() => {
    onSearchChange(debouncedSearchInput);
  }, [debouncedSearchInput, onSearchChange]);

  const handleClassChange = useCallback((e: SelectChangeEvent) => {
    const value = e.target.value;
    setClassFilter(value);
    onClassFilterChange(value);
  }, [onClassFilterChange]);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    onPageChange(newPage);
  }, [onPageChange]);

  const handleLimitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    onLimitChange(newLimit);
    onPageChange(0); // reset to first page on limit change
  }, [onLimitChange, onPageChange]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by Title"
          value={searchInput}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Filter by Class</InputLabel>
          <Select
            value={classFilter}
            onChange={handleClassChange}
            label="Filter by Class"
          >
            <MenuItem value="">All Classes</MenuItem>
            {[1, 2, 3, 4, 10].map((c) => (
              <MenuItem key={c} value={String(c)}>Class {c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.subject}</TableCell>
                <TableCell>{course.class}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Syllabus">
                    <IconButton onClick={() => onViewSyllabus(course.id)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(course.id)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(course.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleLimitChange}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </TableContainer>
    </Box>
  );
};

export const CoursesTable = memo(CoursesTableComponent);

