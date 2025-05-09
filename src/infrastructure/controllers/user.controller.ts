/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Query,
  Patch,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { UpdateUserDto } from 'src/application/users/dto/users.dto';
import { UsersService } from 'src/application/users/services/users.service';
import { ApiService } from '../services/api.service';
import { USER_MESSAGES } from 'src/common/constants/messages.constants';
import { Role, Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/application/auth/guard/roles.guard';

const { USERS_GATHERED, USER_GATHERED, USER_UPDATED, USER_DELETED } =
  USER_MESSAGES;

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly apiService: ApiService,
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const { password_hash, ...user } = await this.usersService.getById(id);
    return this.apiService.buildResponse(USER_GATHERED, user);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const { password_hash, ...rest } = user;
    return this.apiService.buildResponse(USER_GATHERED, rest);
  }

  @Get()
  async getUsersByName(@Query('name') name: string) {
    const users = await this.usersService.getByName(name);
    const sanitizedUsers = users.map(({ password_hash, ...rest }) => rest);

    return this.apiService.buildResponse(USERS_GATHERED, sanitizedUsers);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
    return this.apiService.buildResponse(USER_UPDATED);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return this.apiService.buildResponse(USER_DELETED);
  }
}
