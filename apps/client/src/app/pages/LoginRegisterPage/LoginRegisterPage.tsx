import { Box, Center, Flex, Heading, Image } from '@chakra-ui/react';
import '@fontsource-variable/montserrat';
import { motion } from 'framer-motion';
import loginIcon from '../../assets/login.svg';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

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
              color="#8582b2"
              size="4xl"
              fontFamily="Montserrat Variable"
              fontWeight={800}
              marginTop="0.5em"
              marginBottom="0.5em"
            >
              Doit
            </Heading>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%' }}
            >
              {isFor === 'Login' ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};
