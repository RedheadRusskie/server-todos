import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
  ): Promise<ToDoDto> {
    // return this.todosService.add(user, addTodoDto);
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
