import { IsUUID } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { ToDoDto } from './todo.dto';

export class AddTodoDto extends OmitType(ToDoDto, ['id', 'user']) {
  @IsUUID()
  user!: string;
}
