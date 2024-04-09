import { Box, Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

interface CustomToastProps {
  type: 'error' | 'success';
  message: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({ type, message }) => {
  return (
    <Box
      p={3}
      bg="white"
      borderRadius={50}
      boxShadow="box-shadow: 1px 1px 33px 11px rgba(0,0,0,0.32);"
    >
      <Flex direction="row">
        {type === 'success' ? (
          <CheckCircleIcon
            width="1.5em"
            height="1.5em"
            m="-0.01em 0.5em 0 0"
            color="green.300"
          />
        ) : (
          <WarningIcon
            width="1.5em"
            height="1.5em"
            m="-0.01em 0.5em 0 0"
            color="red.300"
          />
        )}
        <Text>{message}</Text>
      </Flex>
    </Box>
  );
};
