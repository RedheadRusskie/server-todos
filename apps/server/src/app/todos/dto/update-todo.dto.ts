import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { ToDoDto } from './todo.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateToDoDto extends IntersectionType(
  PickType(ToDoDto, ['user']),
  PartialType(PickType(ToDoDto, ['id']))
) {
  @IsString()
  name!: string;

  @IsString()
  body!: string;

  @IsBoolean()
  complete!: boolean;

  last_updated!: Date;
}
