import { Input } from '@chakra-ui/react';

export const CustomInput: React.FC = () => {
  return (
    <Input
      variant="unstyled"
      borderBottom="1px solid lightgray"
      marginBottom="1em"
      _focus={{ borderBottomColor: '#524166' }}
      borderRadius={0}
    />
  );
};
