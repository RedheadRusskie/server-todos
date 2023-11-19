import { Module } from '@nestjs/common';
import { OrmModule } from './orm';
import { ToDosModule } from './todos';
import { ServerUserModule } from './user';
import { ServerAuthModule } from './auth';

@Module({
  imports: [OrmModule, ToDosModule, ServerUserModule, ServerAuthModule],
})
export class AppModule {}
