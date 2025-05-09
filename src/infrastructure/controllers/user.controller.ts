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
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserSWSchema } from 'src/common/swagger/schemas/user-swagger.schemas';

const { USERS_GATHERED, USER_GATHERED, USER_UPDATED, USER_DELETED } =
  USER_MESSAGES;

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('users')
@ApiExtraModels(UserSWSchema)
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly apiService: ApiService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: USER_GATHERED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: USER_GATHERED },
        data: { $ref: getSchemaPath(UserSWSchema) },
      },
    },
  })
  async getUserById(@Param('id') id: string) {
    const { password_hash, ...user } = await this.usersService.getById(id);
    return this.apiService.buildResponse(USER_GATHERED, user);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: USER_GATHERED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: USER_GATHERED },
        data: { $ref: getSchemaPath(UserSWSchema) },
      },
    },
  })
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const { password_hash, ...rest } = user;
    return this.apiService.buildResponse(USER_GATHERED, rest);
  }

  @Get()
  @ApiOperation({ summary: 'Get users by partial name' })
  @ApiResponse({
    status: 200,
    description: USERS_GATHERED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: USERS_GATHERED },
        data: { type: 'array', $ref: getSchemaPath(UserSWSchema) },
      },
    },
  })
  async getUsersByName(@Query('name') name: string) {
    const users = await this.usersService.getByName(name);
    const sanitizedUsers = users.map(({ password_hash, ...rest }) => rest);

    return this.apiService.buildResponse(USERS_GATHERED, sanitizedUsers);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by given field' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: USER_UPDATED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: USER_UPDATED },
      },
    },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
    return this.apiService.buildResponse(USER_UPDATED);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by given id' })
  @ApiResponse({
    status: 200,
    description: USER_DELETED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: USER_DELETED },
      },
    },
  })
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return this.apiService.buildResponse(USER_DELETED);
  }
}
