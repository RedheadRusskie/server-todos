import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { AddTodoDto, UpdateToDoDto } from './dto';
import { CurrentUser, UserEntity } from '../user';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: EntityRepository<ToDoEntity>,
    private readonly em: EntityManager
  ) {}

  async add(@CurrentUser() user, todo: AddTodoDto) {
    const todoToAdd = this.toDoRepository.create({
      user: this.em.getReference(UserEntity, user.id),
      ...todo,
    });

    await this.em.persistAndFlush(todoToAdd);

    return todoToAdd;
  }

  async getAll() {
    return await this.toDoRepository.findAll();
  }

  async findRecordById(id: string) {
    return this.toDoRepository
      .findOneOrFail({ id })
      .then((todo) => todo)
      .catch(() => {
        throw new NotFoundException('To-do not found.');
      });
  }

  async removeRecordById(id: string) {
    return this.toDoRepository.nativeDelete({ id });
  }

  async updateRecordById(id: string, updatedRecord: UpdateToDoDto) {
    await this.findRecordById(id);

    await this.em.nativeUpdate(ToDoEntity, { id }, updatedRecord);

    return updatedRecord;
  }
}
