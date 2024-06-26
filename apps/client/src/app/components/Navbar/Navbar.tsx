import {
  Box,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { TodoModal } from '../TodoModal/TodoModal';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ handleSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');
  const { logout } = useAuth();

  const determineWidth = () => (isSmallScreen ? '89%' : '30em');

  return (
    <Box>
      <TodoModal isOpen={isOpen} onClose={onClose} addTodoMode />
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
          <Flex justifyContent="center" alignItems="center" gap="0.5em">
            <Box
              width="100%"
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
                boxShadow="0 4px 13px rgba(0, 0, 0, 0.1)"
                onClick={onOpen}
                aria-label="Add todo"
                marginLeft="auto"
                background="#7C619F"
                borderRadius="full"
                _hover={{ background: '#665080' }}
                icon={<AddIcon color="white" />}
              />
            </Box>
            <Menu>
              <MenuButton
                backgroundColor="white"
                borderRadius="30px"
                height="3em"
                width="3.5em"
                border="none"
                boxShadow="0 4px 13px rgba(0, 0, 0, 0.1)"
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon color="#665080" />}
                variant="outline"
              />
              <MenuList
                boxShadow="0 4px 13px rgba(0, 0, 0, 0.1)"
                padding="0.5em"
                borderRadius="30px"
              >
                <MenuItem borderRadius="30px" onClick={logout}>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </motion.div>
      </Flex>
    </Box>
  );
};
