import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './entities';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MikroOrmModule.forFeature([UserEntity])],
})
export class ServerUserModule {}
