import { Todo } from '../interfaces/interfaces';

export const sortTodosByUpdateDate = (todos: Todo[]) => {
  return todos.sort((a, b) => {
    const datesUpdated = {
      dateA: new Date(b.last_updated).getTime(),
      dateB: new Date(a.last_updated).getTime(),
    };

    return datesUpdated.dateA - datesUpdated.dateB;
  });
};
