import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';
import { AddTodoDto, ToDoDto, UpdateToDoDto } from './dto';
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
    this.checkPermissions(user, todo.user);

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
    this.checkPermissions(user, record.user.id);
    updatedRecord.last_updated = new Date();

    await this.em.nativeUpdate(ToDoEntity, { id }, updatedRecord);

    return updatedRecord;
  }

  userCanPerformAction(currentUser: UserDto, targetUserId: string) {
    if (currentUser.role.id === 0) return true;

    if (currentUser.id === targetUserId) return true;

    return false;
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

  async findRecordsByUserId(userId: string) {
    const todos = await this.toDoRepository.find({
      user: {
        id: userId,
      },
    });

    if (!todos || todos.length === 0) {
      throw new NotFoundException(`No todos found for user with ID: ${userId}`);
    }

    return todos;
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
