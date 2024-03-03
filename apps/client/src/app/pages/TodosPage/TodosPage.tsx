import { useToast } from '@chakra-ui/react';
import { CustomToast } from '../../components/common/CustomToast/CustomToast';
import { AppSpinner } from '../../components/common/AppSpinner/AppSpinner';
import { sortTodosByUpdateDate } from '../../utils';
import { TodoCard } from '../../components/TodoCard/TodoCard';
import { TodoCardsContainer } from '../../components/TodoCardContainer/TodoCardSContainer';
import { useTodos } from '../../hooks/useTodos';

export const TodosPage: React.FC = () => {
  const toast = useToast();
  const { todoLoading, todos, todoFetchError } = useTodos();
  const sortedTodos = todos ? sortTodosByUpdateDate(todos) : null;

  if (todoLoading) return <AppSpinner />;

  if (todoFetchError)
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <CustomToast type="error" message="Could not fetch to-dos's" />
      ),
    });

  return (
    <TodoCardsContainer>
      {sortedTodos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </TodoCardsContainer>
  );
};
