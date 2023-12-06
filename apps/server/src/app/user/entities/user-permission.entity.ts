import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserEntity } from './user-entity.entity';

@Entity({ tableName: 'user_permission' })
export class UserPermissionEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  role!: string;

  @OneToOne(() => UserEntity, { mappedBy: 'role' })
  user!: UserEntity;
}
