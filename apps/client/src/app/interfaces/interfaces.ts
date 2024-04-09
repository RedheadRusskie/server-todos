export interface Todo {
  id: string;
  user: string;
  name: string;
  body: string;
  complete: boolean;
  added: Date;
  last_updated: Date;
}

export interface UserRole {
  id: number;
}
export interface UserData {
  id: string;
  todos: Todo[];
  added: string;
  last_login: string;
  username: string;
  role: UserRole;
}

export interface LoginFormInput {
  username: string;
  password: string;
}

export interface UserRegistrationPayload {
  username: string;
  password: string;
  role: number;
}

export interface RegisterFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export interface AuthRO {
  accessToken: string;
  userId: string;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
}

export interface AuthAction {
  type: string;
  payload?: {
    token: string | null;
    userId: string | null;
  };
}
