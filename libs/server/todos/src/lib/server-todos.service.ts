import { Injectable } from '@nestjs/common';
import { ToDo } from './interfaces';

@Injectable()
export class ToDosService {
  private readonly ToDos: Array<ToDo>;

  constructor() {
    this.ToDos = [];
  }

  add(todo: ToDo) {
    this.ToDos.push(todo);
  }

  getAll() {
    return this.ToDos;
  }

  findRecordById(id: string) {
    return this.ToDos.find((toDo) => toDo.id === id);
  }

  removeRecordById(id: string) {
    const foundRecord = this.findRecordById(id);
    const foundRecordIndex = this.ToDos.indexOf(foundRecord as ToDo);

    if (foundRecordIndex > -1) this.ToDos.splice(foundRecordIndex, 1);
  }
}
