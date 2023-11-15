import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  TextType,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from '../../user';

@Entity({ tableName: 'todo' })
export class ToDoEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => UserEntity, { joinColumn: 'id' })
  user!: UserEntity;

  @Property()
  name!: string;

  @Property()
  body!: TextType;

  @Property()
  complete!: boolean;
}
