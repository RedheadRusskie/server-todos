import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { LoginRegisterPage } from '../pages/LoginRegisterPage/LoginRegisterPage';

const Routes = () => {
  const { token } = useAuth();

  const authenticatedRoutes = [
    {
      path: '/todos',
      element: <ProtectedRoute />,
    },
  ];

  const routes = [
    {
      path: '/register',
      element: <LoginRegisterPage isFor="Register" />,
    },
    {
      path: '/login',
      element: <LoginRegisterPage isFor="Login" />,
    },
  ];

  return (
    <RouterRoutes>
      {token
        ? authenticatedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        : routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
    </RouterRoutes>
  );
};

export default Routes;
