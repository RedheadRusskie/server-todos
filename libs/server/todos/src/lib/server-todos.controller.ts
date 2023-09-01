import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todos.dto';
import { ToDosService } from './server-todos.service';

@Controller('todos')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Post()
  async create(@Body() addTodoDto: AddTodoDto) {
    this.todosService.add(addTodoDto);
  }

  @Get()
  async findAll() {
    return this.todosService.getAll();
  }

  @Get(':id')
  async findRecordById(@Param() params: string) {
    return this.todosService.findRecordById(params);
  }

  @Delete(':id')
  async removeRecordById(@Param() params: string) {
    this.todosService.removeRecordById(params);
  }
}
