import { Box, Center, Spinner } from '@chakra-ui/react';

export const AppSpinner: React.FC = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    width="100%"
    height="100%"
    backgroundColor="white"
    opacity="0.8"
    zIndex="9999"
  >
    <Center height="100vh">
      <Spinner color="#8582b2" />
    </Center>
  </Box>
);
