import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../../api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildResponse', () => {
    it('should return an object with only message when no data is provided', () => {
      const message = 'Success';
      const result = service.buildResponse(message);

      expect(result).toEqual({
        message,
      });
      expect(result).not.toHaveProperty('data');
    });

    it('should return an object with message and data when data is provided', () => {
      const message = 'Success';
      const data = { id: 1, name: 'Test' };
      const result = service.buildResponse(message, data);

      expect(result).toEqual({
        message,
        data,
      });
    });
  });
});
