import { Test, TestingModule } from '@nestjs/testing';
import { IndicationsService } from '../indications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DrugIndicationEntity } from 'src/domain/indication.entity';
import { mockIndicationsRepository, Mocked } from './indications.service.mock';
import { ScraperService } from 'src/infrastructure/services/scraper.service';
import { Icd10Service } from 'src/infrastructure/services/icd10.service';

const { mockScraperService, mockIcd10Service } = Mocked;

describe('IndicationsService', () => {
  let service: IndicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicationsService,
        { provide: ScraperService, useValue: mockScraperService },
        { provide: Icd10Service, useValue: mockIcd10Service },
        {
          provide: getRepositoryToken(DrugIndicationEntity),
          useValue: mockIndicationsRepository,
        },
      ],
    }).compile();

    service = module.get<IndicationsService>(IndicationsService);
    jest.clearAllMocks();
  });

  describe('getIndications', () => {
    const { indication, icd10Code, drug } = Mocked;

    it('should return ICD10 codes for scraped indications', async () => {
      mockScraperService.scrapeDrugIndications.mockResolvedValueOnce([
        indication,
      ]);
      mockIcd10Service.getIcsd10Code.mockResolvedValueOnce(icd10Code);

      const result = await service.getIndications(drug);

      expect(mockScraperService.scrapeDrugIndications).toHaveBeenCalledWith(
        drug,
      );
      expect(mockIcd10Service.getIcsd10Code).toHaveBeenCalledWith(
        indication.name,
      );
      expect(result).toEqual([
        {
          code: icd10Code,
          name: indication.name,
          description: indication.description,
        },
      ]);
    });

    it('should skip indications with no ICD10 code', async () => {
      mockScraperService.scrapeDrugIndications.mockResolvedValueOnce([
        indication,
      ]);
      mockIcd10Service.getIcsd10Code.mockResolvedValueOnce(null);

      const result = await service.getIndications('drug123');
      expect(result).toEqual([]);
    });
  });

  describe('createIndication', () => {
    const { indication } = Mocked;

    it('should create and save a single indication', async () => {
      const body = indication;
      const created = [{ ...body, id: '1' }];

      mockIndicationsRepository.create.mockReturnValueOnce(created);
      mockIndicationsRepository.save.mockResolvedValueOnce(created);

      const result = await service.createIndication(body as any);

      expect(mockIndicationsRepository.create).toHaveBeenCalledWith([body]);
      expect(mockIndicationsRepository.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });

    it('should create and save multiple indications', async () => {
      const body = [indication, indication];
      const created = body.map((b, i) => ({ ...b, id: `${i}` }));

      mockIndicationsRepository.create.mockReturnValueOnce(created);
      mockIndicationsRepository.save.mockResolvedValueOnce(created);

      const result = await service.createIndication(body as any);

      expect(mockIndicationsRepository.create).toHaveBeenCalledWith(body);
      expect(mockIndicationsRepository.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });
  });
});
