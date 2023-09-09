import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  UuidType,
} from '@mikro-orm/core';
import { ToDo } from './ToDo.entity';

@Entity({ tableName: 'user' })
export class DoitUser {
  @PrimaryKey({ type: 'uuid' })
  id!: UuidType;

  @OneToMany(() => ToDo, (todo) => todo.user)
  todos!: ToDo[];

  @Property()
  username!: string;
}
