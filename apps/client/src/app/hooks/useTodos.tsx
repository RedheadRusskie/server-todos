import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchTodosRequest, sendTodosDeleteRequest } from '../api/api';
import { AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';
import { CustomToast } from '../components/common/CustomToast/CustomToast';
import { Todo } from '../interfaces/interfaces';

const todosQueryKeys = {
  todos: 'todos',
  deleteTodo: 'deleteTodo',
};

export const useTodos = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isLoading: todoLoading,
    data: todos,
    error: todoFetchError,
  } = useQuery<Todo[], AxiosError>({
    queryKey: [todosQueryKeys.todos],
    queryFn: fetchTodosRequest,
  });

  const deleteMutation = useMutation(
    (todoId: string) => sendTodosDeleteRequest(todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [todosQueryKeys.todos] });
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <CustomToast type="success" message="To-do successfully removed." />
          ),
        });
      },
      onError: (error) => {
        if (
          error instanceof Error ||
          (error instanceof AxiosError && error.message)
        )
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <CustomToast type="error" message="Could not remove to-do." />
            ),
          });
      },
    }
  );

  return { todoLoading, todos, todoFetchError, deleteMutation };
};
