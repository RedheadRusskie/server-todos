import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ToDo {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  body!: string;

  @Property()
  complete!: boolean;
}
