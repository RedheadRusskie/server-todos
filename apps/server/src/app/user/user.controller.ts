import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, AddUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() addUserDto: AddUserDto): Promise<UserDto> {
    return this.userService.add(addUserDto);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserDto> {
    return this.userService.findRecordById(id);
  }

  @Get('getUserByUsername/:username')
  async findUserbyId(@Param('username') username: string): Promise<UserDto> {
    return this.userService.findRecordByUsername(username);
  }

  @Delete(':id')
  async removeRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<number> {
    return this.userService.removeRecordById(id);
  }
}
