import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/application/users/dto/users.dto';
import { UsersService } from 'src/application/users/services/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.usersService.getByEmail(email);
  }

  @Get()
  async getUsersByName(@Query('name') name: string) {
    return this.usersService.getByName(name);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
