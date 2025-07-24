// Components/Courses/EditCourseDialog.tsx
import CreateNewCourseDialog from "./CreateNewCourseDialog";
import type { CreateAndEditCoursePayload } from "../../../../Pages/AdminPages/Components/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAndEditCoursePayload) => void;
  courseData: CreateAndEditCoursePayload;
}

const EditCourseDialog: React.FC<Props> = ({ open, onClose, onSubmit, courseData }) => {
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

export default EditCourseDialog;