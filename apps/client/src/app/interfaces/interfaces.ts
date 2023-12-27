export interface Todo {
  id: string;
  user: string;
  name: string;
  body: string;
  complete: boolean;
  added: Date;
  last_updated: Date;
}

export interface UserData {
  id: string;
  todos: Todo[];
  added: string;
  last_login: string;
  username: string;
  role: {
    id: number;
  };
}

export interface LoginFormInput {
  username: string;
  password: string;
}
