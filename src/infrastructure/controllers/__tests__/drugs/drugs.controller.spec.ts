import { Test, TestingModule } from '@nestjs/testing';
import { DrugsController } from '../../drugs.controller';
import { DrugsService } from 'src/application/drugs/services/drugs.service';
import { ApiService } from 'src/infrastructure/services/api.service';
import { DRUG_MESSAGES } from 'src/common/constants/messages.constants';
import {
  mockApiService,
  mockDrugsService,
  Mocked,
} from './drugs.controller.mock';

const { DRUGS_FOUND, DRUG_GATHERED, DRUG_SAVED, DRUG_DELETED } = DRUG_MESSAGES;

describe('DrugsController', () => {
  const { drug, drugName } = Mocked;

  let controller: DrugsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugsController],
      providers: [
        { provide: DrugsService, useValue: mockDrugsService },
        { provide: ApiService, useValue: mockApiService },
      ],
    }).compile();

    controller = module.get<DrugsController>(DrugsController);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should search drugs and return response', async () => {
    mockDrugsService.searchDrugsByName.mockResolvedValueOnce([drug]);

    const result = await controller.searchDrugs(drugName);
    expect(result).toEqual(mockApiService.buildResponse(DRUGS_FOUND, [drug]));
    expect(mockDrugsService.searchDrugsByName).toHaveBeenCalledWith(drugName);
  });

  it('should create a drug and return response', async () => {
    mockDrugsService.createDrug.mockResolvedValueOnce(undefined);

    const result = await controller.createDrug(drug);
    expect(result).toEqual(mockApiService.buildResponse(DRUG_SAVED));
    expect(mockDrugsService.createDrug).toHaveBeenCalledWith(drug);
  });

  it('should get a drug by ID and return response', async () => {
    mockDrugsService.getDrugById.mockResolvedValueOnce(drug);

    const result = await controller.getDrugById(drug.id);
    expect(result).toEqual(mockApiService.buildResponse(DRUG_GATHERED, drug));
    expect(mockDrugsService.getDrugById).toHaveBeenCalledWith(drug.id);
  });

  it('should delete a drug by ID and return response', async () => {
    mockDrugsService.deleteDrugById.mockResolvedValueOnce(undefined);

    const result = await controller.deleteDrug(drug.id);
    expect(result).toEqual(mockApiService.buildResponse(DRUG_DELETED));
    expect(mockDrugsService.deleteDrugById).toHaveBeenCalledWith(drug.id);
  });
});
