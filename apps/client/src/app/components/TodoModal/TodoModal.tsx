import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
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
  Textarea,
} from '@chakra-ui/react';
import { Todo } from '../../interfaces/interfaces';
import styles from './TodoModal.module.scss';
import { DeleteIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { useTodos } from '../../hooks/useTodos';
import { useAuth } from '../../context/AuthContext';

interface TodoModalProps {
  todo?: Todo;
  isOpen: boolean;
  onClose: () => void;
  addTodoMode?: boolean;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  isOpen,
  onClose,
  addTodoMode,
}) => {
  const formattedCreatedDate = !todo
    ? null
    : dayjs(new Date(todo.last_updated)).format('HH:mm on DD/MM/YYYY');
  const { register, handleSubmit } = useForm<Todo>();
  const { deleteMutation, updateMutation, postMutation } = useTodos();
  const { userId: currentUserId } = useAuth();

  const handleAddTodo = async (todo: Partial<Todo>) =>
    await postMutation.mutateAsync({ ...todo, user: currentUserId as string });

  const handleUpdateTodo = async (editedTodo: Todo) => {
    if (!todo) return;

    const data = {
      todoId: todo.id,
      todo: {
        user: todo.user,
        name: editedTodo.name,
        body: editedTodo.body,
        complete: editedTodo.complete,
      },
    };

    return await updateMutation.mutateAsync(data);
  };

  const handleDelete = () => {
    if (todo === undefined) return;
    deleteMutation.mutateAsync(todo.id);
  };

  const onSubmit = (todo: Todo) => {
    if (!addTodoMode) return handleUpdateTodo(todo);
    return handleAddTodo(todo);
  };

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
      onClose={() => {
        handleSubmit(onSubmit)();
        onClose();
      }}
      size={{ base: 'full', md: 'xl' }}
      motionPreset="slideInBottom"
    >
      {modalOverlay}
      <ModalContent className={styles.todoModal}>
        <ModalHeader>
          <Textarea
            defaultValue={!addTodoMode ? todo?.name : 'New todo'}
            autoFocus={false}
            size="sm"
            variant="unstyled"
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              border: 'none',
              maxHeight: '1em',
              height: '0.5em',
              resize: 'none',
              width: '90%',
            }}
            {...register('name')}
          />

          {!addTodoMode && (
            <Text color="#718096" fontSize="0.9rem" textTransform="uppercase">
              Created at {formattedCreatedDate}
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Textarea
              defaultValue={
                !addTodoMode ? todo?.body : 'Todo description here..'
              }
              autoFocus={false}
              variant="unstyled"
              style={{
                marginTop: '-1em',
                border: 'none',
                padding: '1em',
                height: '40vh',
                marginBottom: '1em',
                fontSize: '1.5rem',
              }}
              {...register('body')}
            />
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
              defaultChecked={!addTodoMode ? todo?.complete : false}
              size="lg"
              float="right"
              {...register('complete')}
            >
              Complete
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Box flex="1" textAlign="right">
              {!addTodoMode && (
                <Button
                  width="100%"
                  color="#665080"
                  variant="ghost"
                  leftIcon={<DeleteIcon />}
                  _hover={{ background: 'rgb(255, 255, 255, 0.3)' }}
                  onClick={handleDelete}
                >
                  Remove todo
                </Button>
              )}
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
