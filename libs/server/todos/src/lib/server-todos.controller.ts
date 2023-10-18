import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  ParseUUIDPipeOptions,
  Patch,
  Post,
} from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { ToDosService } from './server-todos.service';
import { ToDoDto } from './dto/todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';

@Controller('todos')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Post()
  async create(@Body() addTodoDto: AddTodoDto): Promise<ToDoDto> {
    this.todosService.add(addTodoDto);

    throw new NotImplementedException();
  }

  @Patch()
  async update(@Body() updateToDoDto: UpdateToDoDto): Promise<ToDoDto> {
    throw new NotImplementedException();
  }

  @Get()
  async findAll(): Promise<ToDoDto[]> {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ToDoDto> {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async removeRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<void> {
    throw new NotImplementedException();
  }
}
