const drugName = 'Aspirin';

const drug = {
  id: 'drug123',
  title: 'Aspirin',
};

export const Mocked = {
  drugName,
  drug,
};

export const mockDrugsService = {
  searchDrugsByName: jest.fn(),
  createDrug: jest.fn(),
  getDrugById: jest.fn(),
  deleteDrugById: jest.fn(),
};

export const mockApiService = {
  buildResponse: jest.fn(),
};
