import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateUserDto extends OmitType(UserDto, ['id']) {
  @IsString()
  password!: string;

  @IsDate()
  last_login: Date;
}
