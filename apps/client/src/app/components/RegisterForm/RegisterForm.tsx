import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
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
import {
  ErrorResponse,
  RegisterFormInput,
  UserData,
  UserRegistrationPayload,
} from '../../interfaces/interfaces';
import { FormErrorBox } from '../common/FormErrorBox/FormErrorBox';

export const RegisterForm: React.FC = () => {
  const linkColor = useColorModeValue('#524166', '#ffffff');
  const usersEndpoint = 'http://localhost:3000/api/users';
  const [formError, setFormError] = useState<string | undefined>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInput>();
  const password = watch('password', '');

  const sendRegisterRequest = async (
    data: RegisterFormInput
  ): Promise<UserData> => {
    const mutatedCredentials: UserRegistrationPayload = {
      username: data.username,
      password: data.password,
      role: 1,
    };

    const response = await axios.post(usersEndpoint, mutatedCredentials);
    return response.data;
  };

  const { mutate, isLoading } = useMutation(sendRegisterRequest, {
    onError: (error: AxiosError<ErrorResponse>) => {
      setFormError(error.response?.data?.message);
    },
    onSuccess: () => {
      setFormError(undefined);
      navigate('/login');
    },
  });

  const onSubmit = (data: RegisterFormInput) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl>
        <Box>
          {formError && <FormErrorBox displayError={formError} />}

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
            <Text color="red">{String(errors.username.message)}</Text>
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
            autoComplete="password"
            {...register('password', {
              required: 'Password is required',
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) || 'Password cannot contain spaces',
              },
            })}
          />
          {errors.password && (
            <Text color="red">{String(errors.password.message)}</Text>
          )}
        </Box>

        <Box marginY="0.7em">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            variant="unstyled"
            borderBottom="1px solid lightgray"
            marginBottom="1em"
            _focus={{ borderBottomColor: '#524166' }}
            borderRadius={0}
            autoComplete="confirm-password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) || 'Password cannot contain spaces',
                matchPassword: (value) =>
                  value === password || 'Passwords do not match',
              },
            })}
          />
          {errors.confirmPassword && (
            <Text color="red">{String(errors.confirmPassword.message)}</Text>
          )}
        </Box>

        <Button isLoading={isLoading} type="submit" borderRadius={0} w="100%">
          Register
        </Button>

        <FormHelperText>
          <Flex align="center" justify="center">
            Already have an account?{' '}
            <Text color={linkColor} marginLeft="0.3em">
              <Link to="/login">Log in here.</Link>
            </Text>
          </Flex>
        </FormHelperText>
      </FormControl>
    </form>
  );
};
