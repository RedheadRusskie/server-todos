import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [],
      dbName: 'to-dos`',
      type: 'postgresql',
    }),
  ],
})
export class OrmModule {}
