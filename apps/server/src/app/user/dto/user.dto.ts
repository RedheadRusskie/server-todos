import { IsInt, IsString, IsUUID } from 'class-validator';
import { UserPermissionEntity } from '../entities/user-permission.entity';

export class UserDto {
  @IsUUID()
  id!: string;

  @IsString()
  username!: string;

  @IsInt()
  role!: UserPermissionEntity;
}
