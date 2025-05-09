import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/application/auth/guard/auth.guard';
import { DrugDto } from 'src/application/drugs/dto/drugs.dto';
import { DrugsService } from 'src/application/drugs/services/drugs.service';
import { DRUG_MESSAGES } from 'src/common/constants/messages.constants';
import { ApiService } from '../services/api.service';
import { RolesGuard } from 'src/application/auth/guard/roles.guard';
import { Roles, Role } from 'src/common/decorators/roles.decorator';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { DrugsSWSchema } from 'src/common/swagger/schemas/drugs-swagger.schemas';

const { DRUGS_FOUND, DRUG_GATHERED, DRUG_SAVED, DRUG_DELETED } = DRUG_MESSAGES;

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('drugs')
@ApiExtraModels(DrugsSWSchema)
@ApiTags('Drugs - Medicines')
export class DrugsController {
  constructor(
    private readonly drugsService: DrugsService,
    private readonly apiService: ApiService,
  ) {}

  @Get('/search')
  @ApiOperation({ summary: 'Serch drugs by a given name' })
  @ApiResponse({
    status: 200,
    description: DRUGS_FOUND,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: DRUGS_FOUND },
        data: { $ref: getSchemaPath(DrugsSWSchema) },
      },
    },
  })
  async searchDrugs(@Query('name') name: string) {
    const drugs = await this.drugsService.searchDrugsByName(name);
    return this.apiService.buildResponse(DRUGS_FOUND, drugs);
  }

  @Post()
  @ApiOperation({ summary: 'Create new searched drug (in the db)' })
  @ApiBody({ type: DrugDto })
  @ApiResponse({
    status: 201,
    description: DRUG_SAVED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: DRUG_SAVED },
      },
    },
  })
  async createDrug(@Body() body: DrugDto) {
    await this.drugsService.createDrug(body);
    return this.apiService.buildResponse(DRUG_SAVED);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get drug by id' })
  @ApiResponse({
    status: 201,
    description: DRUG_GATHERED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: DRUG_GATHERED },
        data: { $ref: getSchemaPath(DrugsSWSchema) },
      },
    },
  })
  async getDrugById(@Query('id') id: string) {
    const drug = await this.drugsService.getDrugById(id);
    return this.apiService.buildResponse(DRUG_GATHERED, drug);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete drug by id' })
  @ApiResponse({
    status: 201,
    description: DRUG_DELETED,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: DRUG_DELETED },
      },
    },
  })
  async deleteDrug(@Param('id') id: string) {
    await this.drugsService.deleteDrugById(id);
    return this.apiService.buildResponse(DRUG_DELETED);
  }
}
