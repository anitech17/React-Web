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

interface SyllabusDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  syllabusSections: SyllabusSection[];
  loading: boolean;
  error: string | null;
}

export const SyllabusDetailsDialog = ({
  open,
  onClose,
  syllabusSections,
  loading,
  error,
}: SyllabusDetailsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Syllabus Details</DialogTitle>
      <DialogContent dividers>
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
              <ListItem key={section.id} alignItems="flex-start" disableGutters>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {`#${section.order}: ${section.title}`}
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
