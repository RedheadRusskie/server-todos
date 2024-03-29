import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Todo } from '../interfaces/interfaces';
import { useAuth } from '../context/AuthContext';

const todosQueryKeys = {
  todos: 'todos',
  deleteTodo: 'deleteTodo',
};

export const useTodos = () => {
  const queryClient = useQueryClient();
  const { token, userId } = useAuth();
  const baseEndpoint = `${import.meta.env.VITE_SERVER_BASE_URL}/todos`;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTodosRequest = (): Promise<Todo[]> =>
    axios
      .get(`${baseEndpoint}/getTodosByUser/${userId}`, headers)
      .then((res: AxiosResponse) => res.data);

  const {
    isLoading: todoLoading,
    data: todos,
    error: todoFetchError,
  } = useQuery<Todo[], AxiosError>({
    queryKey: [todosQueryKeys.todos],
    queryFn: fetchTodosRequest,
  });

  const sendTodosDeleteRequest = (todoId: string): Promise<number> =>
    axios
      .delete(`${baseEndpoint}/${todoId}`, headers)
      .then((res: AxiosResponse) => res.data);

  const deleteMutation = useMutation(
    (todoId: string) => sendTodosDeleteRequest(todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [todosQueryKeys.todos] });
      },
      onError: (error) => {
        if (
          error instanceof Error ||
          (error instanceof AxiosError && error.message)
        )
          throw new Error('Error fetching to-dos: ' + error.message);
      },
    }
  );

  const sendTodosPutRequest = (data: {
    todoId: string;
    todo: Partial<Todo>;
  }): Promise<Partial<Todo>> =>
    axios
      .put(`${baseEndpoint}/${data.todoId}`, { ...data.todo }, headers)
      .then((res: AxiosResponse) => res.data);

  const updateMutation = useMutation(
    (mutationFnArgs: { todoId: string; todo: Partial<Todo> }) =>
      sendTodosPutRequest(mutationFnArgs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [todosQueryKeys.todos] });
      },
      onError: (error) => {
        if (
          error instanceof Error ||
          (error instanceof AxiosError && error.message)
        )
          throw new Error('Error editing todo' + error.message);
      },
    }
  );

  const sendTodosSearchRequest = async (
    searchTerm: string
  ): Promise<Todo[]> => {
    const response = await axios.get(
      `${baseEndpoint}/search/${searchTerm}`,
      headers
    );
    return response.data;
  };

  return {
    todoLoading,
    todos,
    todoFetchError,
    deleteMutation,
    updateMutation,
    sendTodosDeleteRequest,
  };
};
