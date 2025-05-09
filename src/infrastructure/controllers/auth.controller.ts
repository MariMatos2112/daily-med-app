import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/application/auth/dto/auth.dto';
import { AuthService } from 'src/application/auth/services/auth.service';
import { ApiService } from '../services/api.service';
import { AUTH_MESSAGES } from 'src/common/constants/messages.constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const { USER_REGISTERED, USER_LOGGED_IN } = AUTH_MESSAGES;

@ApiTags('User authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register the user to use the API',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: USER_REGISTERED,
    schema: {
      example: {
        message: USER_REGISTERED,
      },
    },
  })
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return this.apiService.buildResponse(USER_REGISTERED);
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({
    summary: 'Authenticate the user to use the API',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: USER_LOGGED_IN,
    schema: {
      example: {
        message: USER_LOGGED_IN,
        data: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = this.authService.login(user);
    return this.apiService.buildResponse(USER_LOGGED_IN, token);
  }
}
