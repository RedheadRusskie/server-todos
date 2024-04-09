import { Box, Center, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Box w="100%" py="0.5em" marginTop="auto">
      <Center>
        <Text>&copy; Doit. No rights reserved.</Text>
      </Center>
    </Box>
  );
};
