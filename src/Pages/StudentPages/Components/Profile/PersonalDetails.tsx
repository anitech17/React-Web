import {
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ClassIcon from "@mui/icons-material/Class";
import type { StudentDashboardData } from "../types";
import { memo } from "react";

interface Props {
  data: StudentDashboardData;
}

const DetailRow = memo(
  ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="body2" fontWeight={600}>
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  )
);

const PersonalDetailsComponent = ({ data }: Props) => {
  const { name, email, phone, parent_whatsapp } = data;

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar
          sx={{ width: 64, height: 64, mr: 2 }}
          src="/avatar_placeholder.png"
        />
        <Box>
          <Typography variant="h6">Student Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome, {name}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<SchoolIcon />} label="Name" value={name} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<EmailIcon />} label="Email" value={email} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<ClassIcon />} label="Class" value={"N/A"} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<PhoneAndroidIcon />} label="Phone" value={phone} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<SupervisorAccountIcon />} label="Parent Contact" value={parent_whatsapp} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export const PersonalDetails = memo(PersonalDetailsComponent);