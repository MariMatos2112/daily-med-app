import { Controller, Get, Param } from '@nestjs/common';
import { IndicationsService } from 'src/application/indications/services/indications.service';

@Controller('indications')
export class IndicationsController {
  constructor(private readonly indicationsService: IndicationsService) {}

  @Get('/search/:drug_id')
  async getDrugIndications(@Param('drug_id') drug_id: string) {
    return await this.indicationsService.getIndications(drug_id);
  }
}
