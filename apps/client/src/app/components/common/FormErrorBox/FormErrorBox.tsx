import { Box, Center, Flex, Text } from '@chakra-ui/react';

interface FormErrorBoxProps {
  displayError: string;
}

export const FormErrorBox: React.FC<FormErrorBoxProps> = ({ displayError }) => {
  return (
    <Box
      marginBottom="1em"
      p="0.5em 1em"
      bg={`linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0))`}
      border="1px"
      borderColor="red.100"
    >
      <Center>
        <Flex>
          <Text color="red.800">{displayError}</Text>
        </Flex>
      </Center>
    </Box>
  );
};
