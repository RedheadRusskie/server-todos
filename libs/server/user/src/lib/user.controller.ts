import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() addUserDto: AddUserDto): Promise<UserDto> {
    return this.userService.add(addUserDto);
  }

  @Get()
  async findAll(): Promise<AddUserDto[]> {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<AddUserDto> {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async removeRecordById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<void> {
    throw new NotImplementedException();
  }
}
