import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useTypedHooks';

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default RequireAuth;
