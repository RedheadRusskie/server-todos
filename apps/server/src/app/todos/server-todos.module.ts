import { Module } from '@nestjs/common';
import { ToDosController } from './server-todos.controller';
import { ToDosService } from './server-todos.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';

@Module({
  controllers: [ToDosController],
  providers: [ToDosService],
  imports: [MikroOrmModule.forFeature([ToDoEntity])],
})
export class ToDosModule {}
