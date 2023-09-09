import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrmService } from './orm.service';
import { ToDo } from './entities/ToDo.entity';
import { DoitUser } from './entities/User.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [ToDo, DoitUser],
      dbName: 'to-dos',
      type: 'postgresql',
      user: 'ivankonnikov',
    }),
  ],
  providers: [OrmService],
  exports: [OrmService],
})
export class OrmModule {}
