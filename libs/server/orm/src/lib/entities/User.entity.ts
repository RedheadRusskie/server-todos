import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { ToDo } from './ToDo.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @OneToMany(() => ToDo, (todo) => todo.user)
  todos!: ToDo[];

  @Property()
  username!: string;
}
