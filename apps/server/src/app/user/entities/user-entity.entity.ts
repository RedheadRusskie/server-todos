import { ToDoEntity } from '../../todos';
import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserPermissionEntity } from './user-permission.entity';

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

  @OneToOne(() => UserPermissionEntity, { fieldName: 'role' })
  role!: UserPermissionEntity;
}
