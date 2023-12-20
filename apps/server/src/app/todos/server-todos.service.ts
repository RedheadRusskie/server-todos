import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { AddTodoDto, UpdateToDoDto } from './dto';
import { CurrentUser, UserEntity } from '../user';
import { UserDto } from '../user/dto';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: EntityRepository<ToDoEntity>,
    private readonly em: EntityManager
  ) {}

  async add(@CurrentUser() user: UserDto, todo: AddTodoDto) {
    this.checkPermissions(user, todo.user.id);

    const todoToAdd = this.toDoRepository.create({
      user: this.em.getReference(UserEntity, user.id),
      ...todo,
    });

    await this.em.persistAndFlush(todoToAdd);

    return { ...todoToAdd, user: todoToAdd.user.id };
  }

  async removeRecordById(@CurrentUser() user: UserDto, id: string) {
    const record = await this.findRecordById(id);
    this.checkPermissions(user, record.user.id);

    return this.toDoRepository.nativeDelete({ id });
  }

  async updateRecordById(
    @CurrentUser() user: UserDto,
    id: string,
    updatedRecord: UpdateToDoDto
  ) {
    const record = await this.findRecordById(id);
    updatedRecord.last_updated = new Date();
    this.checkPermissions(user, record.user.id);

    await this.em.nativeUpdate(ToDoEntity, { id }, updatedRecord);

    return updatedRecord;
  }

  userCanPerformAction(currentUser: UserDto, userId: string) {
    return currentUser.role.id === 0 || currentUser.id === userId;
  }

  private checkPermissions(currentUser: UserDto, targetUserId: string) {
    if (!this.userCanPerformAction(currentUser, targetUserId))
      throw new UnauthorizedException(
        "Unauthorized to perform this action on other user's todos."
      );
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
}
