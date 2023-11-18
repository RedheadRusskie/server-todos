import { Module } from '@nestjs/common';
import { OrmModule } from './orm';
import { ToDosModule } from './todos';
import { ServerUserModule } from './user';
import { ServerAuthModule } from './auth';
import { AppController } from './app.controller';

@Module({
  imports: [OrmModule, ToDosModule, ServerUserModule, ServerAuthModule],
  controllers: [AppController],
})
export class AppModule {}
