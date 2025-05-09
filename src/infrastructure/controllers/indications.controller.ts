import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { IndicationDto } from 'src/application/indications/dto/indications.dto';
import { IndicationsService } from 'src/application/indications/services/indications.service';
import { ApiService } from '../services/api.service';
import { INDICATION_MESSAGES } from 'src/common/constants/messages.constants';

const { INDICATIONS_FOUND, INDICATION_SAVED } = INDICATION_MESSAGES;

@UseGuards(JwtAuthGuard)
@Controller('indications')
export class IndicationsController {
  constructor(
    private readonly indicationsService: IndicationsService,
    private readonly apiService: ApiService,
  ) {}

  @Get('/search/:drug_id')
  async getDrugIndications(@Param('drug_id') drug_id: string) {
    const drugs = await this.indicationsService.getIndications(drug_id);
    return this.apiService.buildResponse(INDICATIONS_FOUND, drugs);
  }

  @Post()
  async addIndication(@Body() body: IndicationDto | IndicationDto[]) {
    await this.indicationsService.createIndication(body);
    return this.apiService.buildResponse(INDICATION_SAVED, body);
  }
}
