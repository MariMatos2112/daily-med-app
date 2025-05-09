import { IndicationDto } from 'src/application/indications/dto/indications.dto';

const drug = 'drug123';
const indicationData: IndicationDto = {
  name: 'Hypertension',
  description: 'Used to treat high blood pressure',
  icd_10_code: 'I10',
  drug_id: 'drug123',
};

export const indicationList: IndicationDto[] = [indicationData];

export const Mocked = {
  drug,
  indicationData,
  indicationList,
};

export const mockIndicationsService = {
  getIndications: jest.fn(),
  createIndication: jest.fn(),
};

export const mockApiService = {
  buildResponse: jest.fn(),
};
