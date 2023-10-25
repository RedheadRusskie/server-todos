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
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async findRecordById(id: string) {
    return this.userRepository
      .findOneOrFail({ id })
      .then((user) => user)
      .catch(() => {
        throw new NotFoundException('User not found.');
      });
  }

  async removeRecordById(id: string) {
    return this.userRepository.nativeDelete({ id });
  }
}
