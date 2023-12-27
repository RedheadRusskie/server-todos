import { Box, Center, Flex, Text } from '@chakra-ui/react';

interface FormErrorBoxProps {
  displayError: string;
}

export const FormErrorBox: React.FC<FormErrorBoxProps> = ({ displayError }) => {
  return (
    <Box
      marginBottom="1em"
      p="0.5em 1em"
      bgColor="red.100"
      border="1px"
      borderColor="red.500"
    >
      <Center>
        <Flex>
          <Text color="red.800">{displayError}</Text>
        </Flex>
      </Center>
    </Box>
  );
};
