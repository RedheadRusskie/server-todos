import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from '@doit/server/orm';
import { ToDosModule } from '../../../../libs/server/todos/src/lib/server-todos.module';

@Module({
  imports: [ToDosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
