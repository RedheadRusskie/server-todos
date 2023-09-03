import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrmService } from './orm.service';
import { ToDo } from './entities/ToDo.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [ToDo],
      dbName: 'to-dos`',
      type: 'postgresql',
    }),
  ],
  providers: [OrmService],
})
export class OrmModule {}
