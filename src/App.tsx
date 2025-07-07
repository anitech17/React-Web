import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedHooks';
import { getCurrentUser } from './features/auth/authThunks';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Login, Unauthorized } from "./Pages";
import { AdminRouter, EducatorRouter, StudentRouter } from "./Routes";
import RequireAuth from "./Routes/RequireAuth";
import { PublicHeader } from './Components';
import { AboutUs, Blogs, ContactUs, Courses, Home, Testimonials } from './Pages';

function AppContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Auto-login check on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  // 🚀 Redirect based on role after authentication
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      switch (user?.role) {
        case 'admin':
          navigate('/admin/users');
          break;
        case 'educator':
          navigate('/educator/profile');
          break;
        case 'student':
          navigate('/student/profile');
          break;
        default:
          navigate('/unauthorized');
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  // Optional loading fallback (except on login page)
  if (loading && location.pathname !== '/') {
    return <div>Loading...</div>; // You can replace with MUI CircularProgress
  }

  return (
    <>
      <PublicHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/admin/*" element={<AdminRouter />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['educator']} />}>
          <Route path="/educator/*" element={<EducatorRouter />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['student']} />}>
          <Route path="/student/*" element={<StudentRouter />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppContent;
