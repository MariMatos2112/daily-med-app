import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/application/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { mockUsersService, mockJwtService, Mocked } from './auth.service.mock';
import { NotFoundException } from '@nestjs/common';

jest.mock('bcrypt');
const mockedBcrypt = bcrypt as any as {
  compare: jest.Mock<Promise<boolean>, any[]>;
  hash: jest.Mock<Promise<string>, any[]>;
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const { login, user } = Mocked;

    it('should return user if email and password are valid', async () => {
      mockUsersService.getByEmail.mockResolvedValueOnce(user);
      mockedBcrypt.compare.mockResolvedValueOnce(true);

      const result = await service.validateUser(login);
      expect(result).toEqual(user);
      expect(mockUsersService.getByEmail).toHaveBeenCalledWith(login.email);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersService.getByEmail.mockResolvedValueOnce(null);

      await expect(service.validateUser(login)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return null if password is incorrect', async () => {
      mockUsersService.getByEmail.mockResolvedValueOnce(user);
      mockedBcrypt.compare.mockResolvedValueOnce(false);

      const result = await service.validateUser(login);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    const { accessToken, user } = Mocked;

    it('should return access token with user data', () => {
      mockJwtService.sign.mockReturnValue(accessToken);
      const result = service.login(user);

      expect(result).toEqual({ access_token: accessToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '1d' },
      );
    });
  });

  describe('register', () => {
    const { register, hashedPassword, user } = Mocked;

    it('should return newly created user', async () => {
      const newUser = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      mockedBcrypt.hash.mockResolvedValueOnce(hashedPassword);
      mockUsersService.create.mockResolvedValueOnce(newUser);

      const result = await service.register(register);
      expect(result).toEqual(newUser);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(register.password, 12);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...register,
        password: hashedPassword,
      });
    });
  });
});
