// Components/Courses/EditCourseDialog.tsx
import type { CreateAndEditCoursePayload } from "../../../../Pages/AdminPages/Components/types";
import { CreateNewCourseDialog } from "./CreateNewCourseDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAndEditCoursePayload) => void;
  courseData: CreateAndEditCoursePayload;
}

export const EditCourseDialog: React.FC<Props> = ({ open, onClose, onSubmit, courseData }) => {
  console.log("courseData", courseData);
  return (
    <CreateNewCourseDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={courseData}
    />
  );
};