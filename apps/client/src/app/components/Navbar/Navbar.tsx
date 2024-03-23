import { useLocation } from 'react-router-dom';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const currentRoute = useLocation();
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  function determineWidth() {
    return isSmallScreen ? '89%' : '30em';
  }

  if (currentRoute.pathname !== '/todos') return;

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
          paddingX="0.3em"
          boxShadow="0 4px 13px rgba(0, 0, 0, 0.1)"
        >
          <Box marginLeft="auto">
            <IconButton
              aria-label="Add todo"
              background="#665080"
              borderRadius="full"
              _hover={{ background: '#7C619F' }}
              icon={<AddIcon color="white" />}
            />
          </Box>
        </Box>
      </motion.div>
    </Flex>
  );
};
