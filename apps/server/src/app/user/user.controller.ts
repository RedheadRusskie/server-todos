import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, AddUserDto } from './dto';
import { Role } from '../auth/enums';
import { RequiredRoles } from '../auth/decorators';

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
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request
  ): Promise<number> {
    return this.userService.removeRecordById(id, req);
  }
}
