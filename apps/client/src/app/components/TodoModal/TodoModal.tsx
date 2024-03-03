import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Todo } from '../../interfaces/interfaces';
import styles from './TodoModal.module.scss';
import { DeleteIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';

import { useTodos } from '../../hooks/useTodos';

interface TodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  isOpen,
  onClose,
}) => {
  const formattedCreatedDate = dayjs(new Date(todo.last_updated)).format(
    'HH:mm on DD/MM/YYYY'
  );

  const { deleteMutation } = useTodos();

  const handleDeleteClick = () => deleteMutation.mutate(todo.id);

  const modalOverlay = (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropBlur="2px"
      backgroundColor="rgba(0, 0, 0, 0.15)"
    />
  );

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'full', md: 'xl' }}
      motionPreset="slideInBottom"
    >
      {modalOverlay}
      <ModalContent className={styles.todoModal}>
        <ModalHeader>
          <Text fontSize="3.2rem">{todo.name}</Text>
          <Text color="#718096" fontSize="0.9rem" textTransform="uppercase">
            Created at {formattedCreatedDate}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="1.8rem" mb="1em">
            {todo.body}
          </Text>
          <Checkbox
            _focusVisible={{
              boxShadow: '0 0 0 3px rgba(102, 80, 128, 0.6)',
              outline: 'none',
            }}
            _checked={{
              '& .chakra-checkbox__control': { background: '#665080' },
              '&:hover .chakra-checkbox__control': { background: '#665080' },
            }}
            _hover={{
              '& .chakra-checkbox__control': {
                background: '#665080',
                transition: '0.3s',
              },
            }}
            iconColor="white"
            borderColor="#665080"
            defaultChecked={todo.complete}
            size="lg"
            float="right"
          >
            Complete
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleDeleteClick()}
            width="100%"
            color="#665080"
            variant="ghost"
            leftIcon={<DeleteIcon color="#665080" />}
            _hover={{ background: 'rgb(255, 255, 255, 0.3)' }}
          >
            Remove to-do
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
