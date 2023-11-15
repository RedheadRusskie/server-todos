import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsString } from 'class-validator';

export class AddUserDto extends OmitType(UserDto, ['id']) {
  @IsString()
  password!: string;
}
