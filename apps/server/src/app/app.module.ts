import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDosModule } from '../../../../libs/server/todos/src/lib/server-todos.module';
import { OrmModule } from '../../../../libs/server/orm/src';

@Module({
  imports: [ToDosModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
