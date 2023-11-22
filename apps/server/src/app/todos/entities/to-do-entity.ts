import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from '../../user';

@Entity({ tableName: 'todo' })
export class ToDoEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => UserEntity, { fieldName: 'user' })
  user!: UserEntity;

  @Property()
  name!: string;

  @Property()
  body!: string;

  @Property()
  complete!: boolean;
}
