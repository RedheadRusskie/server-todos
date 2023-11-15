import { ToDoEntity } from '../../todos';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'user' })
export class UserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  username!: string;

  @Property()
  password!: string;

  @OneToMany(() => ToDoEntity, (todo) => todo.user)
  todos = new Collection<ToDoEntity>(this);
}
