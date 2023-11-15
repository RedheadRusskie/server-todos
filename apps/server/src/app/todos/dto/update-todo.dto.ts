import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { ToDoDto } from './todo.dto';

export class UpdateToDoDto extends IntersectionType(
  PickType(ToDoDto, ['id']),
  PartialType(OmitType(ToDoDto, ['id']))
) {}
