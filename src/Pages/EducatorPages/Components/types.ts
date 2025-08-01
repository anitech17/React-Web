export interface CourseInfo {
  id: string;
  title: string;
  subject?: string;
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

// ✅ NEW TYPE for educator class list response
export interface EducatorClassesResponse {
  scheduled: ScheduledClass[];
  completed: ScheduledClass[];
  requested: ScheduledClass[];
}
