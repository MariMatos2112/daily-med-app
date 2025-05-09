import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { IndicationDto } from 'src/application/indications/dto/indications.dto';
import { IndicationsService } from 'src/application/indications/services/indications.service';
import { ApiService } from '../services/api.service';
import { INDICATION_MESSAGES } from 'src/common/constants/messages.constants';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { IndicationSWSchema } from 'src/common/swagger/schemas/indication-swagger.schema';

const { INDICATIONS_FOUND, INDICATION_SAVED } = INDICATION_MESSAGES;

@UseGuards(JwtAuthGuard)
@Controller('indications')
@ApiExtraModels(IndicationSWSchema)
@ApiTags('Drugs indications - Diseases')
export class IndicationsController {
  constructor(
    private readonly indicationsService: IndicationsService,
    private readonly apiService: ApiService,
  ) {}

  @Get('/search/:drug_id')
  @ApiOperation({
    summary: 'Get drug indications (diseases) for a given drug id',
  })
  @ApiResponse({
    status: 200,
    description: INDICATIONS_FOUND,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: INDICATIONS_FOUND },
        data: { $ref: getSchemaPath(IndicationSWSchema) },
      },
    },
  })
  async getDrugIndications(@Param('drug_id') drug_id: string) {
    const drugs = await this.indicationsService.getIndications(drug_id);
    return this.apiService.buildResponse(INDICATIONS_FOUND, drugs);
  }

  @Post()
  @ApiOperation({
    summary: 'Add a new drug indication',
  })
  @ApiBody({ type: [IndicationDto] })
  @ApiResponse({
    status: 201,
    description: INDICATION_SAVED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: INDICATION_SAVED },
      },
    },
  })
  async addIndication(@Body() body: IndicationDto | IndicationDto[]) {
    await this.indicationsService.createIndication(body);
    return this.apiService.buildResponse(INDICATION_SAVED, body);
  }
}
