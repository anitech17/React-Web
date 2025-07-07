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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";

const educatorDetails = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  subjects: ["Mathematics", "Physics"],
  phone: "+123456789",
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
        src="/educator_avatar_placeholder.png"
      />
      <Box>
        <Typography variant="h6">Educator Profile</Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome, {educatorDetails.name}
        </Typography>
      </Box>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<PersonIcon />}
          label="Name"
          value={educatorDetails.name}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<EmailIcon />}
          label="Email"
          value={educatorDetails.email}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<MenuBookIcon />}
          label="Subjects"
          value={educatorDetails.subjects.join(", ")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <DetailRow
          icon={<PhoneAndroidIcon />}
          label="Phone"
          value={educatorDetails.phone}
        />
      </Grid>
    </Grid>
  </Paper>
);
