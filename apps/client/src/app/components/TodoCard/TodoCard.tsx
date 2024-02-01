import { Card, Divider, Text } from '@chakra-ui/react';
import { Todo } from '../../interfaces/interfaces';
import styles from './TodoCard.module.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const lastUpdateDate = dayjs().to(dayjs.utc(new Date(todo.last_updated)));

  dayjs.extend(utc);
  dayjs.extend(relativeTime);

  const setBorderColor = () =>
    `5px solid ${todo.complete ? '#68D391' : '#E53E3E'}`;

  return (
    <Card
      className={styles.todoCard}
      borderRadius="md"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      borderLeft={setBorderColor()}
      p="1.5em"
    >
      <Text
        fontSize="2xl"
        fontWeight="700"
        textTransform="uppercase"
        color="#46474d"
        marginBottom="1em"
      >
        {todo.name}
      </Text>
      <Divider color="#718096" mb="0.5em" />
      <Text>Last updated {lastUpdateDate}</Text>
    </Card>
  );
};
