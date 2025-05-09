import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/user.entity';
import { mockUserRepository } from './users.service.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Mocked } from './users.service.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('getByEmail', () => {
    const { email, user } = Mocked;

    it('should return a user by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.getByEmail(email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('getById', () => {
    const { user, uuid } = Mocked;

    it('should return user if found', async () => {
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.getById(uuid);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getById(uuid)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const { createUser, user } = Mocked;

    it('should create and return a new user', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await service.create(createUser);
      expect(result).toEqual(user);
    });

    it('should throw ConflictException if email is taken', async () => {
      mockUserRepository.findOne.mockResolvedValue(user);

      await expect(service.create(createUser)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updateUser', () => {
    const { user, updateUser, uuid } = Mocked;

    it('should update the user when it exists', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(user);
      mockUserRepository.update.mockResolvedValueOnce({ affected: 1 });

      const result = await service.updateUser(user.id, updateUser);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: uuid },
      });
      expect(mockUserRepository.update).toHaveBeenCalledWith(uuid, updateUser);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.updateUser(uuid, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteUser', () => {
    const { user, uuid } = Mocked;

    it('should delete the user when it exists', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(user);
      mockUserRepository.remove.mockResolvedValueOnce(undefined);

      await service.deleteUser(user.id);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.deleteUser(uuid)).rejects.toThrow(NotFoundException);
    });
  });
});
