import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback, memo } from "react";
import type {
  CreateAndEditCoursePayload,
  SyllabusSectionInput,
} from "../../../../Pages/AdminPages/Components/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAndEditCoursePayload) => void;
  initialData?: CreateAndEditCoursePayload;
}

const CreateNewCourseDialogComponent = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
  const defaultForm: CreateAndEditCoursePayload = {
    title: "",
    subject: "",
    description: "",
    class: "",
    syllabusSections: [],
  };

  const [form, setForm] = useState<CreateAndEditCoursePayload>(initialData || defaultForm);

  useEffect(() => {
    if (open) {
      setForm(initialData || defaultForm);
    }
  }, [open, initialData]);

  const handleInputChange = useCallback((key: keyof CreateAndEditCoursePayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addSyllabusSection = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      syllabusSections: [
        ...prev.syllabusSections,
        { title: "", description: "", order: prev.syllabusSections.length + 1 },
      ],
    }));
  }, []);

  const updateSection = useCallback(
    (index: number, key: keyof SyllabusSectionInput, value: string | number) => {
      setForm((prev) => {
        const updated = [...prev.syllabusSections];
        updated[index] = { ...updated[index], [key]: value };
        return { ...prev, syllabusSections: updated };
      });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    onSubmit(form);
    onClose();

    if (!initialData) {
      setForm(defaultForm);
    }
  }, [form, onSubmit, onClose, initialData]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? "Edit Course" : "Create New Course"}</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <TextField
            label="Subject"
            fullWidth
            value={form.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
          />
          <TextField
            label="Class"
            fullWidth
            value={form.class}
            onChange={(e) => handleInputChange("class", e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <Typography variant="h6">Syllabus Sections</Typography>
          {form.syllabusSections.map((section, idx) => (
            <Box key={idx} display="flex" gap={2}>
              <TextField
                label="Title"
                value={section.title}
                onChange={(e) => updateSection(idx, "title", e.target.value)}
              />
              <TextField
                label="Description"
                value={section.description}
                onChange={(e) => updateSection(idx, "description", e.target.value)}
              />
              <TextField
                type="number"
                label="Order"
                value={section.order}
                onChange={(e) => updateSection(idx, "order", +e.target.value)}
              />
            </Box>
          ))}

          <Button onClick={addSyllabusSection}>+ Add Section</Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const CreateNewCourseDialog = memo(CreateNewCourseDialogComponent)