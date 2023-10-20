import { OrmModule } from '@doit/server-orm';
import { ToDosModule } from '@doit/server-todos';
import { ServerUserModule } from '@doit/server-user';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmModule, ToDosModule, ServerUserModule],
})
export class AppModule {}
