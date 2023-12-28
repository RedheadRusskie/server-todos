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
  useToast,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { FormErrorBox } from '../common/FormErrorBox/FormErrorBox';
import { ErrorResponse, LoginFormInput } from '../../interfaces/interfaces';
import { CustomToast } from '../common/CustomToast/CustomToast';

export const LoginForm: React.FC = () => {
  const [formError, setFormError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const toast = useToast();
  const linkColor = useColorModeValue('#524166', '#ffffff');
  const loginEndpoint = 'http://localhost:3000/api/auth/login';

  const sendLoginRequest = (data: LoginFormInput): Promise<string> => {
    return axios.post(loginEndpoint, data).then((res) => res.data.accessToken);
  };

  const { mutate, isLoading } = useMutation(sendLoginRequest, {
    onError: (error: AxiosError<ErrorResponse>) => {
      setFormError(error.response?.data?.message);
    },
    onSuccess: (token: string) => {
      localStorage.setItem('accessToken', token);
      setFormError(undefined);
      toast({
        position: 'top',
        duration: 1500,
        render: () => (
          <CustomToast type="success" message="Successfully logged in." />
        ),
      });
    },
  });

  const onSubmit = (data: LoginFormInput) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl>
        <Box>
          {formError && <FormErrorBox displayError={formError} />}

          <Box marginY="0.7em">
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              placeholder="Username"
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
              id="password"
              type="password"
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

          <Button isLoading={isLoading} type="submit" borderRadius={0} w="100%">
            Sign in
          </Button>

          <FormHelperText>
            <Flex align="center" justify="center">
              Don't have an account?{' '}
              <Text color={linkColor} marginLeft="0.3em">
                Register <a href="/register">here.</a>
              </Text>
            </Flex>
          </FormHelperText>
        </Box>
      </FormControl>
    </form>
  );
};
