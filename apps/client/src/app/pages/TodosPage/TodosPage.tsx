import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import { CustomToast } from '../../components/common/CustomToast/CustomToast';
import { AppSpinner } from '../../components/common/AppSpinner/AppSpinner';
import { sortTodosByUpdateDate } from '../../utils';

export const TodosPage: React.FC = () => {
  const todosEndpoint = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/todos/getTodosByUser/${localStorage.getItem('userID')}`;
  const toast = useToast();

  const sendLoginRequest = () =>
    axios
      .get(todosEndpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res: AxiosResponse) => res.data);

  const { isLoading, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: sendLoginRequest,
  });

  if (isLoading) return <AppSpinner />;

  if (error)
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <CustomToast type="error" message="Could not fetch to-dos's" />
      ),
    });

  const sortedTodos = data ? sortTodosByUpdateDate(data) : null;

  return <></>;
};
