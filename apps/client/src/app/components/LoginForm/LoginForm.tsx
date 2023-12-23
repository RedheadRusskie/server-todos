import React from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInput {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const linkColor = useColorModeValue('#524166', '#ffffff');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <FormControl>
        <Box marginBottom="2em">
          <Box marginY="0.7em">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              variant="unstyled"
              borderBottom="1px solid lightgray"
              marginBottom="1em"
              _focus={{ borderBottomColor: '#524166' }}
              borderRadius={0}
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
              type="password"
              placeholder="Password"
              variant="unstyled"
              borderBottom="1px solid lightgray"
              marginBottom="1em"
              _focus={{ borderBottomColor: '#524166' }}
              borderRadius={0}
              {...register('password', {
                required: 'Password is required',
                validate: (value) =>
                  !/\s/.test(value) || 'Password cannot contain spaces',
              })}
            />
            {errors.password && (
              <Text color="red">{String(errors.password.message)}</Text>
            )}
            <FormHelperText>
              <Flex align="center" justify="center">
                Don't have an account?{' '}
                <Text color={linkColor} marginLeft="0.3em">
                  <RouterLink to="/register">Click here.</RouterLink>
                </Text>
              </Flex>
            </FormHelperText>
          </Box>
        </Box>

        <Button type="submit" borderRadius={0} w="100%">
          Log in
        </Button>
      </FormControl>
    </form>
  );
};
