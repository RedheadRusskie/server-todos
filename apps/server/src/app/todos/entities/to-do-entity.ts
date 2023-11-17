import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from '../../user';

@Entity({ tableName: 'todo' })
export class ToDoEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => UserEntity, { joinColumn: 'id', ref: true })
  user!: Ref<UserEntity>;

  @Property()
  name!: string;

  @Property()
  body!: string;

  @Property()
  complete!: boolean;
}
