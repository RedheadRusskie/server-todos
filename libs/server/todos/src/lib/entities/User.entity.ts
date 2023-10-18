import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ToDoEntity } from './ToDo.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'user' })
export class DoitUser {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @OneToMany(() => ToDoEntity, (todo) => todo.user)
  todos!: ToDoEntity[];

  @Property()
  username!: string;
}
