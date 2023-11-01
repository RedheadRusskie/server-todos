import { Module } from '@nestjs/common';
import { OrmModule } from '@doit/server-orm';
import { ToDosModule } from '@doit/server-todos';
import { ServerUserModule } from '@doit/server-user';
import { ServerAuthModule } from '@doit/server-auth';

@Module({
  imports: [OrmModule, ToDosModule, ServerUserModule, ServerAuthModule],
})
export class AppModule {}
