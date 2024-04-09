import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { AuthAction, AuthState } from '../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  setToken: (newToken: string, newUserID: string) => void;
  clearToken: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACTIONS = {
  setToken: 'setToken',
  clearToken: 'clearToken',
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ACTIONS.setToken:
      return {
        ...state,
        token: action.payload?.token ?? null,
        userId: action.payload?.userId ?? null,
      };

    case ACTIONS.clearToken:
      return { ...state, token: null, userId: null };

    default:
      return state;
  }
};

const initialData: AuthState = {
  token: localStorage.getItem('accessToken') || null,
  userId: localStorage.getItem('userId') || null,
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialData);
  const navigate = useNavigate();

  const setToken = (newToken: string, newUserID: string) => {
    localStorage.setItem('accessToken', newToken);
    localStorage.setItem('userId', newUserID);

    dispatch({
      type: ACTIONS.setToken,
      payload: { token: newToken, userId: newUserID },
    });
  };

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    dispatch({ type: ACTIONS.clearToken });
  };

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      clearToken,
      logout,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

export default AuthProvider;
