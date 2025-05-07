import { Injectable } from '@nestjs/common';
import { Icd10Service } from 'src/infrastructure/services/icd10.service';
import { ScraperService } from 'src/infrastructure/services/scraper.service';

@Injectable()
export class IndicationsService {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly icd10Service: Icd10Service,
  ) {}

  async getIndications(drug_id: string) {
    const indications =
      await this.scraperService.scrapeDrugIndications(drug_id);

    const icd10Codes: Record<string, string>[] = [];

    for (const indication of indications) {
      const code = await this.icd10Service.getIcsd10Code(indication);
      if (code) icd10Codes.push({ code, indication });
    }

    return icd10Codes;
  }
}
