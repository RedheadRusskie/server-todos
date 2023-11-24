import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ToDosService } from './server-todos.service';
import { ToDoDto, AddTodoDto, UpdateToDoDto } from './dto';
import { CurrentUser } from '../user';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { EntityRepository } from '@mikro-orm/core';

@Controller('todos')
export class ToDosController {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: EntityRepository<ToDoEntity>,
    private todosService: ToDosService
  ) {}

  @Post()
  async create(
    @CurrentUser() user,
    @Body() addTodoDto: AddTodoDto
  ): Promise<ToDoDto> {
    return this.todosService.add(user, addTodoDto);
  }

  @Put(':id')
  async updateRecordById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateToDoDto: UpdateToDoDto
  ): Promise<UpdateToDoDto> {
    return this.todosService.updateRecordById(id, updateToDoDto);
  }

  @Get()
  async findAll(): Promise<ToDoDto[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ToDoDto> {
    return this.todosService.findRecordById(id);
  }

  @Delete(':id')
  async removeRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<number> {
    return this.todosService.removeRecordById(id);
  }
}
