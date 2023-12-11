import { Module } from '@nestjs/common';
import { UserController } from './server-user.controller';
import { UserService } from './server-user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './entities';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MikroOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class ServerUserModule {}
