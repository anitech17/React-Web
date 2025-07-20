import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { AdminSidebar } from "../Components"
import { AdminClasses, AdminCourses, AdminReports, AdminTests, AdminUsers } from "../Pages"

export const AdminRouter = () => {
    return (
        <Box display="flex">
            <AdminSidebar />
            <Routes>
                <Route path="/users" element={< AdminUsers />} />
                <Route path="/reports" element={< AdminReports />} />
                <Route path="/classes" element={< AdminClasses />} />
                <Route path="/tests" element={< AdminTests />} />
                <Route path="/courses" element={< AdminCourses />} />
            </Routes>
        </Box>
    )
}