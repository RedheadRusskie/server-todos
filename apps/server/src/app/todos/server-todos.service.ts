import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { AddTodoDto } from './dto';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: EntityRepository<ToDoEntity>
  ) {}

  async add(todo: AddTodoDto) {
    console.log(todo);
    // await this.toDoRepository.create(todo)
  }

  async getAll() {
    // await this.ormService.getAll();
  }

  async findRecordById(id: string) {
    // return this.ormService.findRecordById(id);
  }

  async removeRecordById(id: string) {
    // return this.ormService.removeRecordById(id);
  }

  async updateRecordById(id: string, updatedRecord: ToDoEntity) {
    // this.ormService.updateRecordById(id, updatedRecord);
  }
}
