import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}
}
