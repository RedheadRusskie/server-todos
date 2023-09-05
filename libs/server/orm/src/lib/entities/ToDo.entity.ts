import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';

@Entity()
export class ToDo {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => User)
  user!: User;

  @Property()
  name!: string;

  @Property()
  body!: string;

  @Property()
  complete!: boolean;
}
