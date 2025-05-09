import { UserEntity } from 'src/domain/user.entity';
import { UpdateUserDto } from 'src/application/users/dto/users.dto';

const id = 'user123';
const name = 'User';
const email = 'user@example.com';

export const user: UserEntity = {
  id: 'user123',
  name: 'User',
  email: 'user@example.com',
  password_hash: 'hashedpassword',
  role: 'user',
  created_at: new Date(),
};

export const updateUserData: UpdateUserDto = {
  email: 'newuser@example.com',
};

export const Mocked = {
  id,
  email,
  name,
  user,
  updateUserData,
};

export const mockUsersService = {
  getById: jest.fn().mockResolvedValue(user),
  getByEmail: jest.fn().mockResolvedValue(user),
  getByName: jest.fn().mockResolvedValue([user]),
  updateUser: jest.fn().mockResolvedValue(undefined),
  deleteUser: jest.fn().mockResolvedValue(undefined),
};

export const mockApiService = {
  buildResponse: jest.fn().mockReturnValue({
    message: 'mock message',
    data: user,
  }),
};
