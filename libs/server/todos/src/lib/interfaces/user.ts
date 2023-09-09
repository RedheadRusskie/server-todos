import { UuidType } from '@mikro-orm/core';
import { ToDo } from './todo';

export class User {
  id: UuidType;
  username: string;
  todos: ToDo[];

  constructor(id: UuidType, username: string, todos: ToDo[]) {
    this.id = id;
    this.username = username;
    this.todos = todos;
  }
}
