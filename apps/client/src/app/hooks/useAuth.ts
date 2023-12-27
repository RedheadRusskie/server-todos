import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginFormInput } from '../interfaces/interfaces';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginEndpoint = 'http://localhost:3000/api/auth/login';

  const login = async (formInput: LoginFormInput) => {
    setIsLoading(true);

    return axios
      .post(loginEndpoint, formInput)
      .then((response: AxiosResponse<{ accessToken: string }>) => {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setError(null);

        return response.data;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        const errorMessage = (
          (error.response?.data as { message?: string }) || {}
        ).message;
        setError(errorMessage || 'An error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { login, isLoading, error };
};

export default useAuth;
