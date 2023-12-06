import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsInt, IsString } from 'class-validator';
import { UserPermissionEntity } from '../entities';

export class AddUserDto extends OmitType(UserDto, ['id']) {
  @IsString()
  password!: string;

  @IsInt()
  role!: UserPermissionEntity;
}
