export interface EducatorInfo {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SyllabusSection {
  id: string;
  title: string;
  order: number;
}

export interface CourseInfo {
  id: string;
  title: string;
  subject?: string;
  description?: string;
}

export interface Enrollment {
  id: string;
  enrolled_on: string;
  percent_complete: number;
  progress: string;
  course: CourseInfo;
}

export interface ScheduledClass {
  id: string;
  scheduled_at: string;
  join_url: string;
  status: string;
  discussion_topics: string;
  course: CourseInfo;
  syllabusSections: SyllabusSection[];
  educator: EducatorInfo;
}

export interface ScheduledTest {
  id: string;
  scheduled_at: string;
  join_url: string;
  test_format: string;
  course: CourseInfo;
  syllabusSections: SyllabusSection[];
  educator: EducatorInfo;
}

export interface LastTestPerformance {
  id: string;
  marks_scored: number;
  total_marks: number;
  feedback: string;
  submitted_at: string;
  test: {
    test_format: string;
    scheduled_at: string;
    course: {
      title: string;
    };
  };
}

export interface StudentDashboardData {
  id: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  parent_whatsapp: string;
  enrolledCourses: Enrollment[];
  nextScheduledClass: ScheduledClass | null;
  nextTest: ScheduledTest | null;
  lastTestPerformance: LastTestPerformance | null;
}
