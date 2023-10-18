import { OrmModule } from '@doit/server-orm';
import { ToDosModule } from '@doit/server-todos';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmModule, ToDosModule],
})
export class AppModule {}
