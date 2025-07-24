import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import type { SyllabusSection } from "../../../../Pages/AdminPages/Components/types";

interface Props {
  open: boolean;
  onClose: () => void;
  syllabusSections: SyllabusSection[];
  loading: boolean;
  error: string | null;
}

const SyllabusDetailsDialog: React.FC<Props> = ({
  open,
  onClose,
  syllabusSections,
  loading,
  error,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Syllabus Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : syllabusSections.length === 0 ? (
          <Typography>No syllabus sections available.</Typography>
        ) : (
          <List>
            {syllabusSections.map((section) => (
              <ListItem key={section.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      #{section.order}: {section.title}
                    </Typography>
                  }
                  secondary={section.description}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SyllabusDetailsDialog;
