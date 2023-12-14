import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from './entities';
import { AddUserDto } from './dto/add-user.dto';
import { CurrentUser } from './decorators';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager
  ) {}

  async add(dto: AddUserDto) {
    const userExists = await this.userRepository.findOne({
      username: dto.username,
    });

    if (userExists) throw new ConflictException('Username must be unique.');

    const user = this.userRepository.create(dto);
    await this.em.persistAndFlush(user);
    return this.buildUserRO(user);
  }

  async getAll() {
    return (await this.userRepository.findAll()).map((user) =>
      this.buildUserRO(user)
    );
  }

  async findRecord(
    criteria: { id?: string; username?: string },
    notFoundMessage: string,
    includeCredentials: boolean
  ) {
    return this.userRepository
      .findOneOrFail(criteria)
      .then((user) => (!includeCredentials ? this.buildUserRO(user) : user))
      .catch(() => {
        throw new NotFoundException(notFoundMessage);
      });
  }

  async findRecordById(id: string) {
    return this.findRecord({ id }, 'User not found with provided ID.', false);
  }

  async findRecordByUsername(username: string) {
    return this.findRecord(
      { username },
      'User not found with provided username.',
      false
    );
  }

  async removeRecordById(@CurrentUser() user, id: string) {
    if (user.role.id !== 0 && user.id !== id)
      throw new UnauthorizedException('Unauthorized to remove other users.');

    return await this.userRepository.nativeDelete({ id });
  }

  async updateUser(user: UpdateUserDto) {
    const userToAdd = this.userRepository.create(user);

    await this.em.persistAndFlush(userToAdd);

    return this.buildUserRO(userToAdd);
  }

  buildUserRO(user: UserEntity) {
    delete user['password'];

    return user;
  }
}
