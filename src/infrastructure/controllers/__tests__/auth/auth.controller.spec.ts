import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth.controller';
import { AUTH_MESSAGES } from 'src/common/constants/messages.constants';
import {
  mockApiService,
  mockAuthService,
  Mocked,
} from './auth.controller.mock';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/application/auth/services/auth.service';
import { ApiService } from 'src/infrastructure/services/api.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ApiService, useValue: mockApiService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const { registerData } = Mocked;

    it('should register a user and return confirmation message', async () => {
      mockApiService.buildResponse.mockReturnValue({
        message: AUTH_MESSAGES.USER_REGISTERED,
      });

      const result = await controller.register(registerData);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerData);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        AUTH_MESSAGES.USER_REGISTERED,
      );
      expect(result).toEqual({ message: AUTH_MESSAGES.USER_REGISTERED });
    });
  });

  describe('login', () => {
    const { user, token, loginData } = Mocked;

    it('should return token if user is valid', async () => {
      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockReturnValue(token);
      mockApiService.buildResponse.mockReturnValue({
        message: AUTH_MESSAGES.USER_LOGGED_IN,
        data: token,
      });

      const result = await controller.login(loginData);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith(loginData);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        AUTH_MESSAGES.USER_LOGGED_IN,
        token,
      );
      expect(result).toEqual({
        message: AUTH_MESSAGES.USER_LOGGED_IN,
        data: token,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(controller.login(loginData)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(loginData);
    });
  });
});
