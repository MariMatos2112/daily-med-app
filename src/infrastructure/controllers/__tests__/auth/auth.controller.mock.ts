import { LoginDto, RegisterDto } from 'src/application/auth/dto/auth.dto';

const user = {
  id: '1',
  email: 'test@example.com',
  role: 'user',
};

const token = {
  access_token: 'token123',
};

const registerData: RegisterDto = {
  email: 'user@example.com',
  password: 'password123',
  name: 'User',
  role: 'user',
};

const loginData: LoginDto = {
  email: 'user@example.com',
  password: 'password123',
};

export const Mocked = {
  user,
  token,
  registerData,
  loginData,
};

export const mockAuthService = {
  register: jest.fn(),
  validateUser: jest.fn(),
  login: jest.fn(),
};

export const mockApiService = {
  buildResponse: jest.fn(),
};
