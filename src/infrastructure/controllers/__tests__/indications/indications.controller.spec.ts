import { Test, TestingModule } from '@nestjs/testing';
import { IndicationsController } from '../../indications.controller';
import { INDICATION_MESSAGES } from 'src/common/constants/messages.constants';
import {
  mockIndicationsService,
  mockApiService,
} from './indications.controller.mock';
import { IndicationsService } from 'src/application/indications/services/indications.service';
import { ApiService } from 'src/infrastructure/services/api.service';
import { Mocked } from './indications.controller.mock';

describe('IndicationsController', () => {
  let controller: IndicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicationsController],
      providers: [
        {
          provide: IndicationsService,
          useValue: mockIndicationsService,
        },
        {
          provide: ApiService,
          useValue: mockApiService,
        },
      ],
    })
      .overrideProvider('IndicationsService')
      .useValue(mockIndicationsService)
      .overrideProvider('ApiService')
      .useValue(mockApiService)
      .compile();

    controller = module.get<IndicationsController>(IndicationsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDrugIndications', () => {
    const { indicationList, drug } = Mocked;

    it('should return indications for a drug', async () => {
      mockIndicationsService.getIndications.mockResolvedValueOnce(
        indicationList,
      );
      mockApiService.buildResponse.mockReturnValueOnce({
        message: INDICATION_MESSAGES.INDICATIONS_FOUND,
        data: indicationList,
      });

      const result = await controller.getDrugIndications(drug);

      expect(mockIndicationsService.getIndications).toHaveBeenCalledWith(drug);
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        INDICATION_MESSAGES.INDICATIONS_FOUND,
        indicationList,
      );
      expect(result).toEqual({
        message: INDICATION_MESSAGES.INDICATIONS_FOUND,
        data: indicationList,
      });
    });
  });

  describe('addIndication', () => {
    const { indicationData } = Mocked;

    it('should create an indication and return confirmation', async () => {
      mockIndicationsService.createIndication.mockResolvedValueOnce(undefined);
      mockApiService.buildResponse.mockReturnValueOnce({
        message: INDICATION_MESSAGES.INDICATION_SAVED,
        data: indicationData,
      });

      const result = await controller.addIndication(indicationData);

      expect(mockIndicationsService.createIndication).toHaveBeenCalledWith(
        indicationData,
      );
      expect(mockApiService.buildResponse).toHaveBeenCalledWith(
        INDICATION_MESSAGES.INDICATION_SAVED,
        indicationData,
      );
      expect(result).toEqual({
        message: INDICATION_MESSAGES.INDICATION_SAVED,
        data: indicationData,
      });
    });
  });
});
