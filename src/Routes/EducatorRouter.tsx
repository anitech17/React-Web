import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { EducatorSidebar } from "../Components"
import { EducatorClasses, EducatorProfile, EducatorStudents, EducatorTests } from "../EducatorPages"

export const EducatorRouter = () => {
    return (
        <Box display="flex">
            <EducatorSidebar />
            <Routes>
                <Route path="/profile" element={ < EducatorProfile />} />
                <Route path="/students" element={ < EducatorStudents />} />
                <Route path="/Classes" element={ < EducatorClasses />} />
                <Route path="/Tests" element={ < EducatorTests />} />
            </Routes>
        </Box>
    )
}
