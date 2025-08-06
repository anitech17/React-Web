export interface CourseInfo {
  id: string;
  title: string;
  subject?: string;
  class?: string;
}

export interface SyllabusSection {
  id: string;
  title: string;
  order: number;
}

export interface StudentInfo {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    dob?: string;
  };
}

export interface ScheduledClass {
  id: string;
  scheduled_at: string;
  join_url: string;
  status: string;
  discussion_topics: string;
  course: CourseInfo;
  syllabusSections: SyllabusSection[];
  student: StudentInfo;
}

export interface ScheduledTest {
  id: string;
  scheduled_at: string;
  join_url: string;
  test_format: string;
  course: CourseInfo;
  student: StudentInfo;
}

export interface EducatorDashboardData {
  id: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  bio: string;
  expertise: string;
  nextScheduledClass: ScheduledClass | null;
  nextTest: ScheduledTest | null;
}

export interface EducatorClassesResponse {
  scheduled: ScheduledClass[];
  completed: ScheduledClass[];
  requested: ScheduledClass[];
}

export interface EducatorStudentEnrollment {
  id: string;
  student_id: string;
  course_id: string;
  progress: string;
  percent_complete: number;
  enrolled_on: string;
  student: StudentInfo;
  course: CourseInfo;
}

export interface EducatorStudentsResponse {
  data: EducatorStudentEnrollment[];
}