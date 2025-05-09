const indication = {
  name: 'Hypertension',
  description: 'High blood pressure',
};

const icd10Code = 'I10';
const drug = 'drug';

const mockScraperService = {
  scrapeDrugIndications: jest.fn(),
};

const mockIcd10Service = {
  getIcsd10Code: jest.fn(),
};

export const Mocked = {
  indication,
  icd10Code,
  drug,

  mockScraperService,
  mockIcd10Service,
};

export const mockIndicationsRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
