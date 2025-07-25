import { useEffect, useState } from "react";
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
import { DeleteConfirmDialog } from "../../Components/WarningsDialog/DeleteConfirmDialog";
import { Spinner } from "../../Components";
import type { Course, CreateAndEditCoursePayload } from "./Components/types";
import { CoursesTable, CreateNewCourseDialog, EditCourseDialog, SyllabusDetailsDialog } from "./Components";

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
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [courseFormData, setCourseFormData] = useState<CreateAndEditCoursePayload | null>(null);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [syllabusOpen, setSyllabusOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [pageParam, setPageParam] = useState(page);
    const [limitParam, setLimitParam] = useState(limit);

    useEffect(() => {
        dispatch(fetchCourses({ title: search, classId: classFilter, page: pageParam, limit: limitParam }));
    }, [dispatch, search, classFilter, pageParam, limitParam]);

    const handleCreate = (payload: CreateAndEditCoursePayload) => {
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
    };

    const handleEdit = async (courseId: string) => {
        console.log("courseId", courseId);
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        let fetchedSyllabus: any[] = [];

        try {
            fetchedSyllabus = await dispatch(fetchSyllabusByCourseId(courseId)).unwrap();
        } catch (err) {
            enqueueSnackbar("Failed to load syllabus", { variant: "error" });
            return;
        }

        const courseData: CreateAndEditCoursePayload = {
            title: course.title,
            subject: course.subject,
            description: course.description,
            class: course.class,
            syllabusSections: fetchedSyllabus.map((s: any) => ({
                title: s.title,
                description: s.description,
                order: s.order,
            })),
        };

        setSelectedCourse(course);
        setCourseFormData(courseData);
        setEditDialogOpen(true);
    };


    const handleUpdate = (payload: CreateAndEditCoursePayload) => {
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
    };

    const handleDelete = (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;
        setCourseToDelete(course);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
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
    };

    const handleViewSyllabus = async (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        setSelectedCourse(course);
        setSyllabusOpen(true);

        try {
            await dispatch(fetchSyllabusByCourseId(courseId)).unwrap();
        } catch (err) {
            enqueueSnackbar("Failed to load syllabus", { variant: "error" });
        }
    };

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
