// Components/Courses/EditCourseDialog.tsx
import { memo } from "react";
import type { CreateAndEditCoursePayload } from "../../../../Pages/AdminPages/Components/types";
import { CreateNewCourseDialog } from "./CreateNewCourseDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAndEditCoursePayload) => void;
  courseData: CreateAndEditCoursePayload;
}

export const EditCourseDialogComponent = ({ open, onClose, onSubmit, courseData }: Props) => {
  return (
    <CreateNewCourseDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={courseData}
    />
  );
};

export const EditCourseDialog = memo(EditCourseDialogComponent)