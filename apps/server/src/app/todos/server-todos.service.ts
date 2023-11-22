import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { AddTodoDto } from './dto';
import { CurrentUser } from '../user';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: EntityRepository<ToDoEntity>,
    private readonly em: EntityManager
  ) {}

  async add(@CurrentUser() user, todo: AddTodoDto) {
    const todoToAdd = this.toDoRepository.create({ ...todo, user: user });
    await this.em.persistAndFlush(todoToAdd);
    return todoToAdd;
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
