import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  TextType,
  UuidType,
} from '@mikro-orm/core';
import { DoitUser } from './User.entity';

@Entity({ tableName: 'todo' })
export class ToDo {
  @PrimaryKey({ type: 'uuid' })
  id!: UuidType;

  @ManyToOne(() => DoitUser, { fieldName: 'id' })
  user!: DoitUser;

  @Property()
  name!: string;

  @Property()
  body!: TextType;

  @Property()
  complete!: boolean;
}
