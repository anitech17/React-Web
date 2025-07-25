// --- components/PersonalDetails.tsx ---
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
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  data: {
    name: string;
    email: string;
    phone: string;
    bio?: string;
    expertise?: string;
  };
}

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    {icon}
    <Typography variant="body2" fontWeight={600}>
      {label}:
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Stack>
);

export const PersonalDetails: React.FC<Props> = ({ data }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar
          sx={{ width: 64, height: 64, mr: 2 }}
          src="/educator_avatar_placeholder.png"
        />
        <Box>
          <Typography variant="h6">Educator Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome, {data.name}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<PersonIcon />} label="Name" value={data.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<EmailIcon />} label="Email" value={data.email} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <DetailRow icon={<PhoneAndroidIcon />} label="Phone" value={data.phone} />
        </Grid>

        {data.expertise && data.expertise.length > 0 && (
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <DetailRow
              icon={<MenuBookIcon />}
              label="Expertise"
              value={data.expertise}
            />
          </Grid>
        )}

        {data.bio && (
          <Grid size={{ xs: 12 }} component="div">
            <DetailRow icon={<InfoIcon />} label="Bio" value={data.bio} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
