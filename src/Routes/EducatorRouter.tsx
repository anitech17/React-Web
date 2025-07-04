import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { EducatorDashboard } from "../EducatorPages"

export const EducatorRouter = () => {
    return (
        <Box>
            {/* <AdminHeader /> */}
            <Routes>
                <Route path="/dashboard" element={ < EducatorDashboard />} />
            </Routes>
        </Box>
    )
}