import { Module } from '@nestjs/common';
import { ToDosController } from './server-todos.controller';
import { ToDosService } from './server-todos.service';

@Module({
  controllers: [ToDosController],
  providers: [ToDosService],
  exports: [],
})

export class ToDosModule {}
