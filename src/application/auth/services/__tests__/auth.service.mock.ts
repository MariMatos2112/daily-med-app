const login = { email: 'test@example.com', password: 'password123' };
const user = {
  id: '1',
  name: 'Test User',
  role: 'admin',
  email: 'test@example.com',
  password_hash: 'hashed_password',
  created_at: new Date(),
};
const register = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'user',
};

const hashedPassword = 'hashedPassword';
const accessToken = 'mocked_access_token';

export const Mocked = {
  login,
  user,
  register,
  hashedPassword,
  accessToken,
};

export const mockUsersService = {
  getByEmail: jest.fn(),
  create: jest.fn(),
};

export const mockJwtService = {
  sign: jest.fn(),
};
