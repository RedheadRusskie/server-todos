import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from './entities';
import { AddUserDto } from './dto/add-user.dto';

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
    this.em.persistAndFlush(user);
    return this.buildUserRO(user);
  }

  async getAll() {
    return (await this.userRepository.findAll()).map((user) =>
      this.buildUserRO(user)
    );
  }

  async findRecord(
    criteria: { id?: string; username?: string },
    notFoundMessage: string
  ) {
    return this.userRepository
      .findOneOrFail(criteria)
      .then((user) => this.buildUserRO(user))
      .catch(() => {
        throw new NotFoundException(notFoundMessage);
      });
  }

  async findRecordById(id: string) {
    return this.findRecord({ id }, 'User not found with provided ID.');
  }

  async findRecordByUsername(username: string) {
    return this.findRecord(
      { username },
      'User not found with provided username.'
    );
  }

  async removeRecordById(id: string) {
    return this.userRepository.nativeDelete({ id });
  }

  buildUserRO(user: UserEntity) {
    delete user['password'];

    return user;
  }
}
