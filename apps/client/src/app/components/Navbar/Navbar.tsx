import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

interface NavbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ handleSearch }) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  const determineWidth = () => (isSmallScreen ? '89%' : '30em');

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="6em"
      alignItems="center"
      justifyContent="center"
      zIndex="999"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: determineWidth() }}
      >
        <Box
          backgroundColor="white"
          borderRadius="full"
          minH="3em"
          display="flex"
          alignItems="center"
          paddingRight="0.3em"
          paddingLeft="1em"
          boxShadow="0 4px 13px rgba(0, 0, 0, 0.1)"
        >
          <Input
            maxWidth="25em"
            marginLeft="auto"
            variant="unstyled"
            placeholder="Search"
            onChange={handleSearch}
          />
          <IconButton
            aria-label="Add todo"
            marginLeft="auto"
            background="#7C619F"
            borderRadius="full"
            _hover={{ background: '#665080' }}
            icon={<AddIcon color="white" />}
          />
        </Box>
      </motion.div>
    </Flex>
  );
};
