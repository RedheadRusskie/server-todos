import { useAuth } from '../context/AuthContext';
import { TodosPage } from '../pages/TodosPage/TodosPage';
import { LoginRegisterPage } from '../pages/LoginRegisterPage/LoginRegisterPage';

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) return <LoginRegisterPage isFor="Login" />;

  return <TodosPage />;
};
