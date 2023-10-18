import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  TextType,
} from '@mikro-orm/core';
import { DoitUser } from './User.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'todo' })
export class ToDoEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => DoitUser, { joinColumn: 'id' })
  user!: DoitUser;

  @Property()
  name!: string;

  @Property()
  body!: TextType;

  @Property()
  complete!: boolean;
}
