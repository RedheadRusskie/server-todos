import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todos.dto';
import { ToDosService } from './server-todos.service';
import { ParseStringPipe } from './pipes/ParseStringPipe';

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
  async findRecordById(@Param('id', new ParseStringPipe()) id: string) {
    return this.todosService.findRecordById(id);
  }

  @Delete(':id')
  async removeRecordById(@Param('id', new ParseStringPipe()) id: string) {
    this.todosService.removeRecordById(id);
  }
}
