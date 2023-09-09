/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ToDo } from './entities/ToDo.entity';
import { UuidType } from '@mikro-orm/core';

@Injectable()
export class OrmService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  async add(todoData: ToDo) {
    const todo = this.em.create(ToDo, todoData);
    await this.em.persistAndFlush(todo);
  }

  async getAll() {
    return this.em.find(ToDo, {});
  }

  async findRecordById(id: UuidType) {
    return this.em.find(ToDo, { id });
  }

  async removeRecordById(id: UuidType) {
    const foundRecord = await this.findRecordById(id);

    if (foundRecord) await this.em.removeAndFlush(foundRecord);
  }

  async updateRecordById(id: UuidType, updatedRecord: ToDo) {
    const foundRecord = await this.findRecordById(id);

    if (foundRecord) {
      Object.assign(foundRecord, updatedRecord);

      await this.em.flush();
    }
  }
}
