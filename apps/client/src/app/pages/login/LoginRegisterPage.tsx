import { Box, Center, Flex, Heading, Image } from '@chakra-ui/react';
import '@fontsource/merriweather';
import loginIcon from '../../assets/login.svg';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/common/RegisterForm/RegisterForm';

interface LoginRegisterPageProps {
  isFor: 'Login' | 'Register';
}

export const LoginRegisterPage: React.FC<LoginRegisterPageProps> = ({
  isFor,
}) => {
  return (
    <Flex minH="100vh" width="100vw">
      <Box flex="2" bg="transparent">
        <Center>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
          >
            <Image src={loginIcon} boxSize="35em" objectFit="contain" />
          </Box>
        </Center>
      </Box>
      <Box flex="1" bg="white">
        <Center>
          <Flex
            w="80%"
            direction="column"
            alignItems="center"
            textAlign="center"
          >
            <Heading
              as="h3"
              size="4xl"
              fontFamily="merriweather"
              fontWeight={800}
              marginTop="0.5em"
              marginBottom="0.5em"
            >
              Doit
            </Heading>
            {isFor === 'Login' ? <LoginForm /> : <RegisterForm />}
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};
