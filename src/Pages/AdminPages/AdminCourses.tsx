import { useEffect, useState, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import {
  fetchCourses,
  createCourse,
  editCourse,
  deleteCourse,
  fetchSyllabusByCourseId,
} from "../../features/admin/thunks";
import { Spinner } from "../../Components";
import { DeleteConfirmDialog } from "../../Components/WarningsDialog/DeleteConfirmDialog";
import {
  CoursesTable,
  CreateNewCourseDialog,
  EditCourseDialog,
  SyllabusDetailsDialog,
} from "./Components";
import type { Course, CreateAndEditCoursePayload } from "./Components/types";

export const AdminCourses = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {
    courses,
    total,
    page,
    limit,
    loading,
    syllabusSections,
    syllabusLoading,
    syllabusError,
  } = useAppSelector((state) => state.admin.courses);

  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState<CreateAndEditCoursePayload | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [pageParam, setPageParam] = useState(page);
  const [limitParam, setLimitParam] = useState(limit);

  useEffect(() => {
    dispatch(fetchCourses({ title: search, classId: classFilter, page: pageParam, limit: limitParam }));
  }, [dispatch, search, classFilter, pageParam, limitParam]);

  const handleCreate = useCallback((payload: CreateAndEditCoursePayload) => {
    dispatch(createCourse(payload))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Course created successfully", { variant: "success" });
        setOpenDialog(false);
        dispatch(fetchCourses({ title: search, classId: classFilter, page: pageParam, limit: limitParam }));
      })
      .catch((err) => {
        enqueueSnackbar(err || "Failed to create course", { variant: "error" });
      });
  }, [dispatch, enqueueSnackbar, search, classFilter, pageParam, limitParam]);

  const handleEdit = useCallback(async (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    try {
      const fetchedSyllabus = await dispatch(fetchSyllabusByCourseId(courseId)).unwrap();

      setSelectedCourse(course);
      setCourseFormData({
        title: course.title,
        subject: course.subject,
        description: course.description,
        class: course.class,
        syllabusSections: fetchedSyllabus.map((s: any) => ({
          title: s.title,
          description: s.description,
          order: s.order,
        })),
      });

      setEditDialogOpen(true);
    } catch {
      enqueueSnackbar("Failed to load syllabus", { variant: "error" });
    }
  }, [courses, dispatch, enqueueSnackbar]);

  const handleUpdate = useCallback((payload: CreateAndEditCoursePayload) => {
    if (!selectedCourse) return;

    dispatch(editCourse({ courseId: selectedCourse.id, data: payload }))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Course updated successfully", { variant: "success" });
        setEditDialogOpen(false);
        setCourseFormData(null);
        dispatch(fetchCourses({ title: search, classId: classFilter, page: pageParam, limit: limitParam }));
      })
      .catch((err) => {
        enqueueSnackbar(err || "Failed to update course", { variant: "error" });
      });
  }, [dispatch, enqueueSnackbar, selectedCourse, search, classFilter, pageParam, limitParam]);

  const handleDelete = useCallback((courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setCourseToDelete(course);
      setDeleteDialogOpen(true);
    }
  }, [courses]);

  const confirmDelete = useCallback(() => {
    if (!courseToDelete) return;

    dispatch(deleteCourse(courseToDelete.id))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Course deleted successfully", { variant: "success" });
        dispatch(fetchCourses({ title: search, classId: classFilter, page: pageParam, limit: limitParam }));
      })
      .catch((err) => {
        enqueueSnackbar(err || "Failed to delete course", { variant: "error" });
      })
      .finally(() => {
        setDeleteDialogOpen(false);
        setCourseToDelete(null);
      });
  }, [dispatch, enqueueSnackbar, courseToDelete, search, classFilter, pageParam, limitParam]);

  const handleViewSyllabus = useCallback(async (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    setSelectedCourse(course);
    setSyllabusOpen(true);

    try {
      await dispatch(fetchSyllabusByCourseId(courseId)).unwrap();
    } catch {
      enqueueSnackbar("Failed to load syllabus", { variant: "error" });
    }
  }, [courses, dispatch, enqueueSnackbar]);

  return (
    <Box width="100%" p={3}>
      {(loading || syllabusLoading) && <Spinner />}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Admin Courses</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add New Course
        </Button>
      </Box>

      <CoursesTable
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewSyllabus={handleViewSyllabus}
        onSearchChange={setSearch}
        onClassFilterChange={setClassFilter}
        onPageChange={setPageParam}
        onLimitChange={(newLimit: number) => {
          setLimitParam(newLimit);
          setPageParam(0);
        }}
        page={pageParam}
        limit={limitParam}
        total={total}
      />

      <CreateNewCourseDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />

      {courseFormData && (
        <EditCourseDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          courseData={courseFormData}
          onSubmit={handleUpdate}
        />
      )}

      {selectedCourse && (
        <SyllabusDetailsDialog
          open={syllabusOpen}
          onClose={() => setSyllabusOpen(false)}
          syllabusSections={syllabusSections}
          loading={syllabusLoading}
          error={syllabusError}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete course "${courseToDelete?.title}"?`}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};
