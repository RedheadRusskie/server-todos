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
import { RequiredRoles } from '../auth/decorators';
import { Role } from '../auth/enums';

@Controller('todos')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Post()
  @RequiredRoles(Role.Superuser, Role.User)
  async create(
    @CurrentUser() user,
    @Body() addTodoDto: AddTodoDto
  ): Promise<AddTodoDto> {
    return this.todosService.add(user, addTodoDto);
  }

  @Put(':id')
  @RequiredRoles(Role.Superuser, Role.User)
  async updateRecordById(
    @CurrentUser() user,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateToDoDto: UpdateToDoDto
  ): Promise<UpdateToDoDto> {
    return this.todosService.updateRecordById(user, id, updateToDoDto);
  }

  @Get()
  @RequiredRoles(Role.Superuser)
  async findAll(): Promise<ToDoDto[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  @RequiredRoles(Role.Superuser)
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ToDoDto> {
    return this.todosService.findRecordById(id);
  }

  @Delete(':id')
  @RequiredRoles(Role.Superuser, Role.User)
  async removeRecordById(
    @CurrentUser() user,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<number> {
    return this.todosService.removeRecordById(user, id);
  }
}
