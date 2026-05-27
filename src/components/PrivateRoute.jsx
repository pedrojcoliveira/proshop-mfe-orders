import { Navigate, Outlet } from 'react-router-dom';
import authService from 'mfeAuth/AuthService';

const PrivateRoute = () => {
  return authService.isAuthenticated() ? <Outlet /> : <Navigate to='/user/login' replace />;
};

export default PrivateRoute;
