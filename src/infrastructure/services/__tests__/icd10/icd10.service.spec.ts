import { Test, TestingModule } from '@nestjs/testing';
import { Icd10Service } from '../../icd10.service';
import axios from 'axios';
import { CLINICAL_TABLES_BASE_URL } from 'src/common/constants/endpoints.contants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Icd10Service', () => {
  let service: Icd10Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Icd10Service],
    }).compile();

    service = module.get<Icd10Service>(Icd10Service);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getIcsd10Code', () => {
    it('should return null when no matches are found', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [null, null, null, []],
      });

      const result = await service.getIcsd10Code('NonexistentDisease');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: 'NonexistentDisease' },
        },
      );
      expect(result).toBeNull();
    });

    it('should return code when exact disease name match is found', async () => {
      const diseaseName = 'Diabetes mellitus';
      const mockData = [
        null,
        null,
        null,
        [
          ['E11', 'Diabetes mellitus'],
          ['E10', 'Type 1 diabetes mellitus'],
        ],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getIcsd10Code(diseaseName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: diseaseName },
        },
      );
      expect(result).toBe('E11');
    });

    it('should return code when normalized disease name match is found', async () => {
      const diseaseName = 'diabetes mellitus';
      const mockData = [
        null,
        null,
        null,
        [
          ['E11', 'Diabetes Mellitus'],
          ['E10', 'Type 1 diabetes mellitus'],
        ],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getIcsd10Code(diseaseName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: diseaseName },
        },
      );
      expect(result).toBe('E11');
    });

    it('should return code when disease name is partially included in a match', async () => {
      const diseaseName = 'diabetes';
      const mockData = [
        null,
        null,
        null,
        [
          ['E13', 'Other specified diabetes mellitus'],
          ['E11', 'Type 2 diabetes mellitus'],
        ],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getIcsd10Code(diseaseName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: diseaseName },
        },
      );
      expect(result).toBe('E13');
    });

    it('should return first code when no specific match is found', async () => {
      const diseaseName = 'heart condition';
      const mockData = [
        null,
        null,
        null,
        [
          ['I25.10', 'Atherosclerotic heart disease'],
          ['I51.9', 'Heart disease, unspecified'],
        ],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getIcsd10Code(diseaseName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: diseaseName },
        },
      );
      expect(result).toBe('I25.10');
    });

    it('should handle special characters in disease names', async () => {
      const diseaseName = "Crohn's disease";
      const mockData = [
        null,
        null,
        null,
        [['K50.90', "Crohn's disease, unspecified"]],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getIcsd10Code(diseaseName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: diseaseName },
        },
      );
      expect(result).toBe('K50.90');
    });

    it('should handle API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.getIcsd10Code('Diabetes')).rejects.toThrow(
        'API Error',
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CLINICAL_TABLES_BASE_URL}`,
        {
          params: { sf: 'code,name', terms: 'Diabetes' },
        },
      );
    });
  });
});
