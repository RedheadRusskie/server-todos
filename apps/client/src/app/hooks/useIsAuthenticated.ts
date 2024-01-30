import { jwtDecode } from 'jwt-decode';

export const useIsAuthenticated = () => {
  const jwt = localStorage.getItem('accessToken');

  return jwt ? new Date().getTime() < (jwtDecode(jwt)?.exp ?? 0) * 1000 : false;
};
