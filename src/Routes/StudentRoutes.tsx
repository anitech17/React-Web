import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { StudentDashboard } from "../StudentPages"

export const StudentRouter = () => {
    return (
        <Box>
            {/* <AdminHeader /> */}
            <Routes>
                <Route path="/dashboard" element={ < StudentDashboard />} />
            </Routes>
        </Box>
    )
}