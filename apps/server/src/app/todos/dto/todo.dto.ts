import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../user';

export class ToDoDto {
  @IsUUID()
  id!: string;

  @IsUUID()
  user: UserEntity;

  @IsString()
  name!: string;

  @IsString()
  body!: string;

  @IsBoolean()
  complete!: boolean;
}
