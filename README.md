
# Online Learning Platform – Frontend

A scalable and modular **frontend application** for an **online learning platform**, developed using **React**, **TypeScript**, **Vite**, and **Redux Toolkit**. The application supports **three distinct user roles**: **Admin**, **Educator**, and **Student**, each with its own dedicated dashboard and feature set.

---

## 🚀 Features

### 🧑‍💼 Role-Based Dashboards

- **Admin Dashboard**
  - User Management (Add/Edit/Delete users)
  - Course Management with syllabus sections
  - Class Scheduling & Management
  - Reports & Test Management

- **Educator Dashboard**
  - Manage and Schedule Classes
  - Test Creation and Evaluation
  - Student Management and Progress Tracking

- **Student Dashboard**
  - View Scheduled/Completed Classes
  - Track Test Performance and Progress Reports
  - Request Classes and Submit Comments

### 🔐 Authentication & Authorization

- Token-based login and route protection
- Auto-login through saved access tokens
- Role-specific routing using protected routes

### ⚙️ Architecture

- **Redux Toolkit** for centralized and scalable state management
- **Redux Thunks** for asynchronous side-effect handling
- Organized feature-based folder structure (admin, auth, educator, student)
- Axios-based API service abstraction

### 🧩 Global UI Components

- Role-based sidebars (`AdminSidebar`, `EducatorSidebar`, `StudentSidebar`)
- Snackbars and feedback dialogs
- Modular and reusable dialog components

---

## 🔮 Planned Enhancements

- **WebSocket Integration**
  - Real-time chat between students and educators
  - Live updates on class status or new announcements

- **Notification System**
  - In-app and optional push notifications

---

## 🧠 Tech Stack

- **React + Vite + TypeScript**
- **Redux Toolkit + Thunks**
- **React Router v6**
- **Axios for API calls**
- **ESLint + Prettier for code quality**
- **Material UI / Custom Styled Components**

---

## 📁 Project Structure

```

├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── app
│   │   └── store.ts
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── Components
│   │   ├── AdminSidebar.tsx
│   │   ├── CustomSnackbar.tsx
│   │   ├── EducatorSidebar.tsx
│   │   ├── index.tsx
│   │   ├── PublicHeader.tsx
│   │   ├── Spinner.tsx
│   │   ├── StudentSidebar.tsx
│   │   └── WarningsDialog
│   │       └── DeleteConfirmDialog.tsx
│   ├── features
│   │   ├── admin
│   │   │   ├── slices
│   │   │   │   ├── classesSlice.ts
│   │   │   │   ├── coursesSlice.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── reportsSlice.ts
│   │   │   │   ├── sliceHandlers
│   │   │   │   │   ├── coursesSliceHandlers.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── usersSliceHandlers.ts
│   │   │   │   └── usersSlice.ts
│   │   │   └── thunks
│   │   │       ├── classesThunks.ts
│   │   │       ├── coursesThunks.ts
│   │   │       ├── index.ts
│   │   │       ├── reportsThunks.ts
│   │   │       └── usersThunks.ts
│   │   └── auth
│   │       ├── authSlice.ts
│   │       └── authThunks.ts
│   ├── hooks
│   │   └── useTypedHooks.ts
│   ├── index.css
│   ├── main.tsx
│   ├── Pages
│   │   ├── AdminPages
│   │   │   ├── AdminClasses.tsx
│   │   │   ├── AdminCourses.tsx
│   │   │   ├── AdminReports.tsx
│   │   │   ├── AdminTests.tsx
│   │   │   ├── AdminUsers.tsx
│   │   │   ├── Components
│   │   │   │   ├── Classes
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Courses
│   │   │   │   │   ├── CoursesTable.tsx
│   │   │   │   │   ├── CreateNewCourseDialog.tsx
│   │   │   │   │   ├── EditCourseDialog.tsx
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── SyllabusDetailsDialog.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Reports
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Tests
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Users
│   │   │   │       ├── index.tsx
│   │   │   │       ├── UserDialog.tsx
│   │   │   │       └── UsersTable.tsx
│   │   │   └── index.tsx
│   │   ├── AuthPages
│   │   │   ├── index.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Unauthorised.tsx
│   │   ├── EducatorPages
│   │   │   ├── Components
│   │   │   │   ├── Classes
│   │   │   │   │   ├── CompletedClasses.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── ScheduleClassDialog.tsx
│   │   │   │   │   └── ScheduledClasses.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Profile
│   │   │   │   │   ├── ClassScheduling.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── PersonalDetails.tsx
│   │   │   │   │   ├── StudentManagement.tsx
│   │   │   │   │   └── TestManagement.tsx
│   │   │   │   ├── Students
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── StudentDialog.tsx
│   │   │   │   │   └── StudentTable.tsx
│   │   │   │   └── Tests
│   │   │   │       └── index.ts
│   │   │   ├── EducatorClasses.tsx
│   │   │   ├── EducatorProfile.tsx
│   │   │   ├── EducatorStudents.tsx
│   │   │   ├── EducatorTests.tsx
│   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   ├── PublicPages
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Blogs.tsx
│   │   │   ├── ContactUs.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── index.tsx
│   │   │   └── Testimonials.tsx
│   │   └── StudentPages
│   │       ├── Components
│   │       │   ├── Classes
│   │       │   │   ├── CommentDialog.tsx
│   │       │   │   ├── CompletedClasses.tsx
│   │       │   │   ├── index.tsx
│   │       │   │   ├── RequestClassDialog.tsx
│   │       │   │   └── ScheduledClasses.tsx
│   │       │   ├── index.tsx
│   │       │   ├── Profile
│   │       │   │   ├── index.tsx
│   │       │   │   ├── LastTestResult.tsx
│   │       │   │   ├── NextClassScheduled.tsx
│   │       │   │   ├── NextTestScheduled.tsx
│   │       │   │   ├── PersonalDetails.tsx
│   │       │   │   └── ProgressReportSummary.tsx
│   │       │   ├── Progress
│   │       │   │   ├── index.tsx
│   │       │   │   ├── PerformanceInsights.tsx
│   │       │   │   ├── ProgressSummary.tsx
│   │       │   │   ├── SubjectProgress.tsx
│   │       │   │   └── TestPerformance.tsx
│   │       │   └── Tests
│   │       │       ├── ComingTests.tsx
│   │       │       ├── CompletedTests.tsx
│   │       │       ├── index.tsx
│   │       │       └── TestDetailsDialog.tsx
│   │       ├── index.tsx
│   │       ├── StudentClasses.tsx
│   │       ├── StudentProfile.tsx
│   │       ├── StudentProgress.tsx
│   │       └── StudentTests.tsx
│   ├── Routes
│   │   ├── AdminRouter.tsx
│   │   ├── EducatorRouter.tsx
│   │   ├── index.tsx
│   │   ├── RequireAuth.tsx
│   │   └── StudentRoutes.tsx
│   ├── Services
│   │   └── axiosConfig.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

````

---

## 📦 Getting Started

To run this project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## ✅ ESLint + TypeScript Configuration

To enable strict type-aware rules with ESLint, use the following config setup:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

Add React-specific rules with:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

```
