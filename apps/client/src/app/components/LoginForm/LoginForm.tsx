import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { FormErrorBox } from '../common/FormErrorBox/FormErrorBox';
import { ErrorResponse, LoginFormInput } from '../../interfaces/interfaces';

export const LoginForm: React.FC = () => {
  const loginEndpoint = 'http://localhost:3000/api/auth/login';
  const linkColor = useColorModeValue('#524166', '#ffffff');
  const [formError, setFormError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const sendLoginRequest = (data: LoginFormInput): Promise<string> => {
    return axios.post(loginEndpoint, data).then((res) => res.data.accessToken);
  };

  const { mutate, isLoading } = useMutation(sendLoginRequest, {
    onError: (error: AxiosError<ErrorResponse>) => {
      setFormError(error.response?.data?.message);
    },
    onSuccess: (token: string) => {
      localStorage.setItem('accessToken', token);
    },
  });

  const onSubmit = (data: LoginFormInput) => {
    setFormError(undefined);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl>
        <Box marginBottom="2em">
          {formError && <FormErrorBox displayError={formError} />}

          <Box marginY="0.7em">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              id="username"
              variant="unstyled"
              borderBottom="1px solid lightgray"
              marginBottom="1em"
              _focus={{ borderBottomColor: '#524166' }}
              borderRadius={0}
              autoComplete="username"
              {...register('username', {
                required: 'Username is required',
                validate: (value) =>
                  !/\s/.test(value) || 'Username cannot contain spaces',
              })}
            />
            {errors.username && (
              <Text color="red.500">{String(errors.username.message)}</Text>
            )}
          </Box>

          <Box marginY="0.7em">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="current-password"
              placeholder="Password"
              variant="unstyled"
              borderBottom="1px solid lightgray"
              marginBottom="1em"
              _focus={{ borderBottomColor: '#524166' }}
              borderRadius={0}
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                validate: (value) =>
                  !/\s/.test(value) || 'Password cannot contain spaces',
              })}
            />
            {errors.password && (
              <Text color="red.500">{String(errors.password.message)}</Text>
            )}
          </Box>

          <FormHelperText>
            <Flex align="center" justify="center">
              Don't have an account?{' '}
              <Text color={linkColor} marginLeft="0.3em">
                Register <a href="/register">here.</a>
              </Text>
            </Flex>
          </FormHelperText>

          <Button isLoading={isLoading} type="submit" borderRadius={0} w="100%">
            Log in
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
