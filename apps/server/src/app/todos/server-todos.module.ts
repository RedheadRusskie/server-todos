import { Module } from '@nestjs/common';
import { ToDosController } from './server-todos.controller';
import { ToDosService } from './server-todos.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ToDoEntity } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([ToDoEntity])],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}
