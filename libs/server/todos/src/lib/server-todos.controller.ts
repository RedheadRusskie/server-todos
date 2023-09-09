import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todos.dto';
import { ToDosService } from './server-todos.service';
import { UuidType } from '@mikro-orm/core';

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
  async findRecordById(@Param('id') id: UuidType) {
    return this.todosService.findRecordById(id);
  }

  @Delete(':id')
  async removeRecordById(@Param('id') id: UuidType) {
    this.todosService.removeRecordById(id);
  }
}
