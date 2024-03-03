import axios, { AxiosResponse } from 'axios';
import { Todo } from '../interfaces/interfaces';

const baseEndpoint = `${import.meta.env.VITE_SERVER_BASE_URL}/todos`;
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
};
const userId = localStorage.getItem('userID');

export const fetchTodosRequest = (): Promise<Todo[]> =>
  axios
    .get(`${baseEndpoint}/getTodosByUser/${userId}`, headers)
    .then((res: AxiosResponse) => res.data);

export const sendTodosDeleteRequest = (todoId: string): Promise<number> =>
  axios
    .delete(`${baseEndpoint}/${todoId}`, headers)
    .then((res: AxiosResponse) => res.data);
