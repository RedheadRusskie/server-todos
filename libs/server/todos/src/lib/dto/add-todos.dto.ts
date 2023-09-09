import { TextType, UuidType } from '@mikro-orm/core';
import { User } from '../interfaces/user';

export class AddTodoDto {
  id!: UuidType;
  name!: string;
  body!: TextType;
  complete!: boolean;
  user!: User;
}
