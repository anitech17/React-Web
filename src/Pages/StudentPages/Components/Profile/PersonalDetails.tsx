// --- components/PersonalDetailsSection.tsx ---
import { Paper, Box, Avatar, Typography, Grid, Stack, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const personalDetails = {
  name: "Anna",
  email: "anna.green@email.com",
  class: "8",
  courses: ["English", "Math", "Science"],
  phone: "123-456-7890",
  parent: "987-654-3210",
};

const DetailRow = ({ icon, label, value }: any) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    {icon}
    <Typography variant="body2" fontWeight={600}>
      {label}:
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Stack>
);

export const PersonalDetails = () => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Box display="flex" alignItems="center" mb={3}>
      <Avatar
        sx={{ width: 64, height: 64, mr: 2 }}
        src="/avatar_placeholder.png"
      />
      <Box>
        <Typography variant="h6">Student Profile</Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome, {personalDetails.name}
        </Typography>
      </Box>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow icon={<SchoolIcon />} label="Name" value={personalDetails.name} />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow icon={<EmailIcon />} label="Email" value={personalDetails.email} />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow icon={<ClassIcon />} label="Class" value={personalDetails.class} />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<MenuBookIcon />}
          label="Courses"
          value={personalDetails.courses.join(", ")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<PhoneAndroidIcon />}
          label="Phone"
          value={personalDetails.phone}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<SupervisorAccountIcon />}
          label="Parent Contact"
          value={personalDetails.parent}
        />
      </Grid>
    </Grid>
  </Paper>
);