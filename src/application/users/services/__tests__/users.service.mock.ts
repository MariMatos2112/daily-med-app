const uuid = '408b172b-5976-48d5-bdb2-e7617ad8b7ac';
const email = 'captain.america@marvel.com';

const user = {
  id: uuid,
  name: 'Captain America',
  email,
  role: 'admin',
  created_at: '2025-05-08T01:40:33.991Z',
};

const createUser = {
  name: 'Captain America',
  email,
  password: 'marvel123',
  role: 'admin',
};

const updateUser = {
  name: 'Black Widow',
};

export const Mocked = {
  user,
  email,
  uuid,
  createUser,
  updateUser,
};

export const mockUserRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};
