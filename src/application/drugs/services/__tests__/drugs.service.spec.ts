import { Test, TestingModule } from '@nestjs/testing';
import { DrugsService } from '../drugs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DrugEntity } from 'src/domain/drugs.entity';
import { mockDrugRepository } from './drugs.service.mock';
import axios from 'axios';
import { Mocked } from './drugs.service.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DrugsService', () => {
  let service: DrugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrugsService,
        {
          provide: getRepositoryToken(DrugEntity),
          useValue: mockDrugRepository,
        },
      ],
    }).compile();

    service = module.get<DrugsService>(DrugsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchDrugsByName', () => {
    const { dailyMedResults, name, searchResult } = Mocked;

    it('should return mapped drug results from DailyMed', async () => {
      mockedAxios.get.mockResolvedValueOnce(dailyMedResults);

      const result = await service.searchDrugsByName(name);
      expect(result).toEqual(searchResult);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('createDrug', () => {
    const { drug, newDrug } = Mocked;

    it('should return existing drug if found', async () => {
      mockDrugRepository.findOneBy.mockResolvedValueOnce(drug);

      const result = await service.createDrug(newDrug);
      expect(result).toEqual(drug);
    });

    it('should create and save new drug if not exists', async () => {
      mockDrugRepository.findOneBy.mockResolvedValueOnce(undefined);
      mockDrugRepository.create.mockReturnValueOnce(newDrug);
      mockDrugRepository.save.mockResolvedValueOnce(newDrug);

      const result = await service.createDrug(newDrug);
      expect(result).toEqual(newDrug);
    });
  });

  describe('getDrugById', () => {
    const { drug, id } = Mocked;

    it('should return a drug by id', async () => {
      mockDrugRepository.findOneBy.mockResolvedValueOnce(drug);

      const result = await service.getDrugById(id);
      expect(result).toEqual(drug);
    });
  });

  describe('deleteDrugById', () => {
    const { drug, id } = Mocked;

    it('should throw if drug is not found', async () => {
      mockDrugRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.deleteDrugById('not-found')).rejects.toThrow(
        'Drug not found',
      );
    });

    it('should delete drug if found', async () => {
      mockDrugRepository.findOneBy.mockResolvedValueOnce(drug);
      mockDrugRepository.delete.mockResolvedValueOnce({ affected: 1 });

      const result = await service.deleteDrugById(id);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
