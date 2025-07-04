import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { StudentSidebar } from "../Components"
import { StudentClasses, StudentProfile, StudentProgress, StudentTests } from "../StudentPages"

export const StudentRouter = () => {
    return (
        <Box display="flex">
            <StudentSidebar />
            <Routes>
                <Route path="/profile" element={ < StudentProfile />} />
                <Route path="/progress" element={ < StudentProgress />} />
                <Route path="/Classes" element={ < StudentClasses />} />
                <Route path="/Tests" element={ < StudentTests />} />
            </Routes>
        </Box>
    )
}