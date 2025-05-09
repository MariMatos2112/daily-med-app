import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user.controller';
import {
  mockUsersService,
  mockApiService,
  Mocked,
} from './user.controller.mock';
import { USER_MESSAGES } from 'src/common/constants/messages.constants';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/application/users/services/users.service';
import { ApiService } from 'src/infrastructure/services/api.service';

describe('UserController', () => {
  const { user, id, email, name } = Mocked;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: ApiService,
          useValue: mockApiService,
        },
      ],
    })
      .overrideProvider('UsersService')
      .useValue(mockUsersService)
      .overrideProvider('ApiService')
      .useValue(mockApiService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user data excluding password_hash', async () => {
      mockUsersService.getById.mockResolvedValueOnce(user);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: USER_MESSAGES.USER_GATHERED,
        data: { ...user, password_hash: undefined },
      });

      const result = await controller.getUserById(id);

      expect(mockUsersService.getById).toHaveBeenCalledWith(id);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        USER_MESSAGES.USER_GATHERED,
        { ...user, password_hash: undefined },
      );
      expect(result).toEqual({
        message: USER_MESSAGES.USER_GATHERED,
        data: { ...user, password_hash: undefined },
      });
    });
  });

  describe('getUserByEmail', () => {
    it('should return user data if user is found', async () => {
      mockUsersService.getByEmail.mockResolvedValueOnce(user);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: USER_MESSAGES.USER_GATHERED,
        data: { ...user, password_hash: undefined },
      });

      const result = await controller.getUserByEmail(email);

      expect(mockUsersService.getByEmail).toHaveBeenCalledWith(email);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        USER_MESSAGES.USER_GATHERED,
        { ...user, password_hash: undefined },
      );
      expect(result).toEqual({
        message: USER_MESSAGES.USER_GATHERED,
        data: { ...user, password_hash: undefined },
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersService.getByEmail.mockResolvedValueOnce(null);

      await expect(controller.getUserByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUsersByName', () => {
    it('should return an array of users excluding password_hash', async () => {
      mockUsersService.getByName.mockResolvedValueOnce([user]);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: USER_MESSAGES.USERS_GATHERED,
        data: [{ ...user, password_hash: undefined }],
      });

      const result = await controller.getUsersByName(name);

      expect(mockUsersService.getByName).toHaveBeenCalledWith(name);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        USER_MESSAGES.USERS_GATHERED,
        [{ ...user, password_hash: undefined }],
      );
      expect(result).toEqual({
        message: USER_MESSAGES.USERS_GATHERED,
        data: [{ ...user, password_hash: undefined }],
      });
    });
  });

  describe('updateUser', () => {
    const { updateUserData } = Mocked;

    it('should update the user and return confirmation message', async () => {
      mockUsersService.updateUser.mockResolvedValueOnce(undefined);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: USER_MESSAGES.USER_UPDATED,
        data: undefined,
      });

      const result = await controller.updateUser(id, updateUserData);

      expect(mockUsersService.updateUser).toHaveBeenCalledWith(
        id,
        updateUserData,
      );
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        USER_MESSAGES.USER_UPDATED,
      );
      expect(result).toEqual({
        message: USER_MESSAGES.USER_UPDATED,
        data: undefined,
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return confirmation message', async () => {
      mockUsersService.deleteUser.mockResolvedValueOnce(undefined);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: USER_MESSAGES.USER_DELETED,
        data: undefined,
      });

      const result = await controller.deleteUser(id);

      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(id);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        USER_MESSAGES.USER_DELETED,
      );
      expect(result).toEqual({
        message: USER_MESSAGES.USER_DELETED,
        data: undefined,
      });
    });
  });
});
