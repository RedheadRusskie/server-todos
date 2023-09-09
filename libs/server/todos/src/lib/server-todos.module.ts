import { Module } from '@nestjs/common';
import { ToDosController } from './server-todos.controller';
import { ToDosService } from './server-todos.service';
import { OrmModule } from '../../../orm/src/lib/orm.module';

@Module({
  controllers: [ToDosController],
  providers: [ToDosService],
  exports: [ToDosService],
  imports: [OrmModule],
})
export class ToDosModule {}
