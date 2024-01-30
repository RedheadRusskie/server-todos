import { Card, Text } from '@chakra-ui/react';
import { Todo } from '../../interfaces/interfaces';
import styles from './TodoCard.module.scss';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <Card
      className={styles.todoCard}
      borderRadius="md"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p="1.5em"
    >
      <Text
        size="2xl"
        fontWeight="bold"
        textTransform="uppercase"
        color="#46474d"
      >
        {todo.name}
      </Text>
    </Card>
  );
};
