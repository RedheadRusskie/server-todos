import { Box, Center, Flex, Image } from '@chakra-ui/react';
import loginIcon from '../../assets/login.svg';

export const Login: React.FC = () => {
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
            <Image src={loginIcon} boxSize="40em" objectFit="contain" />
          </Box>
        </Center>
      </Box>
      <Box flex="1" bg="white"></Box>
    </Flex>
  );
};
