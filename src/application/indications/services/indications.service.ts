import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugIndicationEntity } from 'src/domain/indication.entity';
import { Icd10Service } from 'src/infrastructure/services/icd10.service';
import { ScraperService } from 'src/infrastructure/services/scraper.service';
import { Repository } from 'typeorm';
import { IndicationDto } from '../dto/indications.dto';

@Injectable()
export class IndicationsService {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly icd10Service: Icd10Service,

    @InjectRepository(DrugIndicationEntity)
    private readonly indicationsRepository: Repository<DrugIndicationEntity>,
  ) {}

  async getIndications(drug_id: string) {
    const indications =
      await this.scraperService.scrapeDrugIndications(drug_id);

    const icd10Codes: Record<string, string>[] = [];

    for (const indication of indications) {
      const { name, description } = indication;

      const code = await this.icd10Service.getIcsd10Code(name);
      if (code) icd10Codes.push({ code, name, description });
    }

    return icd10Codes;
  }

  async createIndication(body: IndicationDto | IndicationDto[]) {
    const created = this.indicationsRepository.create(
      Array.isArray(body) ? body : [body],
    );
    return this.indicationsRepository.save(created);
  }
}
