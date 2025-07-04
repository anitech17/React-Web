import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import ClassIcon from "@mui/icons-material/Class";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../hooks/useTypedHooks';
import { logout } from '../features/auth/authSlice';

export const StudentSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                backgroundColor: "#f5faff",
                borderRight: "1px solid #e0e0e0",
                padding: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top Icon and Label */}
            <Box display="flex" alignItems="center" gap={1} mb={3}>
                <HomeIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                    TUTOR
                </Typography>
            </Box>

            <Divider />

            {/* Main Navigation */}
            <Box flexGrow={1}>
                <List>
                    <ListItemButton onClick={() => navigate("/student/profile")}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/student/progress")}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Progress" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/student/classes")}>
                        <ListItemIcon>
                            <ClassIcon />
                        </ListItemIcon>
                        <ListItemText primary="Classes" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/student/tests")}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tests" />
                    </ListItemButton>
                </List>
            </Box>

            {/* Logout Button at Bottom */}
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </Box>
    );
};
