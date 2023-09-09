import { TextType, UuidType } from '@mikro-orm/core';
import { User } from './user';

export class ToDo {
  id: UuidType;
  name: string;
  body: TextType;
  complete: boolean;
  user: User;

  constructor(id: UuidType, name: string, body: TextType, user: User) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.complete = false;
    this.user = user;
  }
}
