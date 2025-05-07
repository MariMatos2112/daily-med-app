import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IndicationDto } from 'src/application/indications/dto/indications.dto';
import { IndicationsService } from 'src/application/indications/services/indications.service';

@Controller('indications')
export class IndicationsController {
  constructor(private readonly indicationsService: IndicationsService) {}

  @Get('/search/:drug_id')
  async getDrugIndications(@Param('drug_id') drug_id: string) {
    return await this.indicationsService.getIndications(drug_id);
  }

  @Post()
  async addIndication(@Body() body: IndicationDto | IndicationDto[]) {
    return await this.indicationsService.createIndication(body);
  }
}
