import { OmitType } from '@nestjs/swagger';
import { ToDoDto } from './todo.dto';

export class AddTodoDto extends OmitType(ToDoDto, ['id']) {}
