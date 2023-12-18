import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsDate } from 'class-validator';

export class UpdateUserDto extends OmitType(UserDto, ['id']) {
  @IsDate()
  last_login: Date;
}
