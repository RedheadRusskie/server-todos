import { useState } from 'react';
import { Todo } from '../../interfaces/interfaces';
import { Box, useToast } from '@chakra-ui/react';
import { CustomToast } from '../../components/common/CustomToast/CustomToast';
import { AppSpinner } from '../../components/common/AppSpinner/AppSpinner';
import { sortTodosByUpdateDate } from '../../utils';
import { TodoCard } from '../../components/TodoCard/TodoCard';
import { TodoCardsContainer } from '../../components/TodoCardContainer/TodoCardSContainer';
import { useTodos } from '../../hooks/useTodos';
import { Navbar } from '../../components/Navbar/Navbar';

export const TodosPage: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | undefined>();
  const [searchValue, setSearchValue] = useState<string | null>();
  const toast = useToast();
  const { todoLoading, todos, todoFetchError } = useTodos();
  const sortedTodos = todos ? sortTodosByUpdateDate(todos) : null;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    setFilteredTodos(
      todos?.filter((todo) =>
        todo.name
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLocaleLowerCase())
      )
    );
    setSearchValue(searchTerm);
  };

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
    <Box>
      <Navbar handleSearch={handleSearch} />
      <TodoCardsContainer>
        {(searchValue ? filteredTodos : sortedTodos)?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </TodoCardsContainer>
    </Box>
  );
};
