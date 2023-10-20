import { Injectable } from '@nestjs/common';
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
    const user = this.userRepository.create(dto);

    await this.em.persistAndFlush(user);

    return user;
  }

  async getAll() {
    // await this.ormService.getAll();
  }

  async findRecordById(id: string) {
    // return this.ormService.findRecordById(id);
  }

  async removeRecordById(id: string) {
    // return this.ormService.removeRecordById(id);
  }

  async updateRecordById(id: string, updatedRecord: UserEntity) {
    // this.ormService.updateRecordById(id, updatedRecord);
  }
}
