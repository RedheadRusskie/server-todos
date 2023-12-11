import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './server-user.service';
import { UserDto, AddUserDto } from './dto';
import { Role } from '../auth/enums';
import { RequiredRoles } from '../auth/decorators';
import { CurrentUser } from './decorators';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() addUserDto: AddUserDto): Promise<UserDto> {
    return this.userService.add(addUserDto);
  }

  @Get()
  @RequiredRoles(Role.Superuser)
  async findAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @RequiredRoles(Role.Superuser)
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserDto> {
    return this.userService.findRecordById(id);
  }

  @Get('getUserByUsername/:username')
  @RequiredRoles(Role.Superuser)
  async findUserbyId(@Param('username') username: string): Promise<UserDto> {
    return this.userService.findRecordByUsername(username);
  }

  @Delete(':id')
  @RequiredRoles(Role.Superuser, Role.User)
  async removeRecordById(
    @CurrentUser() user,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<number> {
    return this.userService.removeRecordById(user, id);
  }
}
