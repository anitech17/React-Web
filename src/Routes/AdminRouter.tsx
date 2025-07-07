import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { AdminSidebar } from "../Components"
import { AdminClasses, AdminReports, AdminTests, AdminUsers } from "../Pages"

export const AdminRouter = () => {
    return (
        <Box display="flex">
            <AdminSidebar />
            <Routes>
                <Route path="/users" element={< AdminUsers />} />
                <Route path="/reports" element={< AdminReports />} />
                <Route path="/Classes" element={< AdminClasses />} />
                <Route path="/Tests" element={< AdminTests />} />
            </Routes>
        </Box>
    )
}