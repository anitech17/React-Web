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
import { useEffect, useState } from "react";
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

const CreateNewCourseDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState<CreateAndEditCoursePayload>(
    initialData || {
      title: "",
      subject: "",
      description: "",
      class: "",
      syllabusSections: [],
    }
  );

  console.log("initialData", initialData);


  const addSyllabusSection = () => {
    const newSection: SyllabusSectionInput = {
      title: "",
      description: "",
      order: form.syllabusSections.length + 1,
    };

    setForm((prev) => ({
      ...prev,
      syllabusSections: [...prev.syllabusSections, newSection],
    }));
  };

  const updateSection = (
    index: number,
    key: keyof SyllabusSectionInput,
    value: string | number
  ) => {
    const updated = [...form.syllabusSections];
    updated[index] = { ...updated[index], [key]: value };
    setForm({ ...form, syllabusSections: updated });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    if (!initialData) {
      setForm({
        title: "",
        subject: "",
        description: "",
        class: "",
        syllabusSections: [],
      });
    }
  };

  useEffect(() => {
    if (open) {
      setForm(
        initialData || {
          title: "",
          subject: "",
          description: "",
          class: "",
          syllabusSections: [],
        }
      );
    }
  }, [open, initialData]);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? "Edit Course" : "Create New Course"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Subject"
            fullWidth
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <TextField
            label="Class"
            fullWidth
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Typography variant="h6">Syllabus Sections</Typography>
          {form.syllabusSections.map((section, idx) => (
            <Box key={idx} display="flex" gap={2}>
              <TextField
                label="Title"
                value={section.title}
                onChange={(e) =>
                  updateSection(idx, "title", e.target.value)
                }
              />
              <TextField
                label="Description"
                value={section.description}
                onChange={(e) =>
                  updateSection(idx, "description", e.target.value)
                }
              />
              <TextField
                type="number"
                label="Order"
                value={section.order}
                onChange={(e) =>
                  updateSection(idx, "order", +e.target.value)
                }
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

export default CreateNewCourseDialog;
