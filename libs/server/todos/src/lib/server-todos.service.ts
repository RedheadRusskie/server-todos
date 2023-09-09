import { Injectable } from '@nestjs/common';
import { ToDo } from './interfaces/todo';
import { UuidType } from '@mikro-orm/core';
import { OrmService } from '../../../orm/src/lib/orm.service';

@Injectable()
export class ToDosService {
  constructor(private readonly ormService: OrmService) {}

  async add(todo: ToDo) {
    await this.ormService.add(todo);
  }

  async getAll() {
    await this.ormService.getAll();
  }

  async findRecordById(id: UuidType) {
    return this.ormService.findRecordById(id);
  }

  async removeRecordById(id: UuidType) {
    return this.ormService.removeRecordById(id);
  }

  async updateRecordById(id: UuidType, updatedRecord: ToDo) {
    this.ormService.updateRecordById(id, updatedRecord);
  }
}
