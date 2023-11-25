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

@Controller('todos')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Post()
  async create(
    @CurrentUser() user,
    @Body() addTodoDto: AddTodoDto
  ): Promise<AddTodoDto> {
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
