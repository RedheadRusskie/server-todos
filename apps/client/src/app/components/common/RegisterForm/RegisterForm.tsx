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
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface RegisterFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const linkColor = useColorModeValue('#524166', '#ffffff');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInput>();

  const password = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
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
              type="password"
              placeholder="Confirm Password"
              variant="unstyled"
              borderBottom="1px solid lightgray"
              marginBottom="1em"
              _focus={{ borderBottomColor: '#524166' }}
              borderRadius={0}
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
        </Box>

        <Button type="submit" borderRadius={0} w="100%">
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
