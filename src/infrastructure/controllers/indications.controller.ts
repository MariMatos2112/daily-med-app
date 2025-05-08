import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { IndicationDto } from 'src/application/indications/dto/indications.dto';
import { IndicationsService } from 'src/application/indications/services/indications.service';

@UseGuards(JwtAuthGuard)
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
