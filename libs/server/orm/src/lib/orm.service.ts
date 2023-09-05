import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ToDo } from './entities/ToDo.entity';

@Injectable()
export class OrmService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  async add(todo: ToDo) {
    await this.em.persistAndFlush(todo);
  }

  async getAll() {
    return this.em.find(ToDo, {});
  }

  async findRecordById(id: string) {
    return this.em.find(ToDo, { id });
  }

  async removeRecordById(id: string) {
    const foundRecord = this.findRecordById(id);

    if (foundRecord) await this.em.removeAndFlush(foundRecord);
  }
}
