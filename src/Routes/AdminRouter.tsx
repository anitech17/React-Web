import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { AdminDashboard } from "../AdminPages"

export const AdminRouter = () => {
    return (
        <Box>
            {/* <AdminHeader /> */}
            <Routes>
                <Route path="/dashboard" element={ < AdminDashboard />} />
            </Routes>
        </Box>
    )
}