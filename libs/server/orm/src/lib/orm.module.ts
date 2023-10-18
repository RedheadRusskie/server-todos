import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'to-dos',
      type: 'postgresql',
      user: 'ivankonnikov',
      autoLoadEntities: true,
    }),
  ],
})
export class OrmModule {}
