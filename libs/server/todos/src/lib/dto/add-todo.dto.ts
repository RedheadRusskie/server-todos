import { OmitType } from '@nestjs/swagger';
import { ToDoEntity } from '../entities';

export class AddTodoDto extends OmitType(ToDoEntity, ['id']) {}
