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

const { DRUGS_FOUND, DRUG_GATHERED, DRUG_SAVED, DRUG_DELETED } = DRUG_MESSAGES;

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('drugs')
export class DrugsController {
  constructor(
    private readonly drugsService: DrugsService,
    private readonly apiService: ApiService,
  ) {}

  @Get('/search')
  async searchDrugs(@Query('name') name: string) {
    const drugs = await this.drugsService.searchDrugsByName(name);
    return this.apiService.buildResponse(DRUGS_FOUND, drugs);
  }

  @Post()
  async createDrug(@Body() body: DrugDto) {
    await this.drugsService.createDrug(body);
    return this.apiService.buildResponse(DRUG_SAVED);
  }

  @Get(':id')
  async getDrugById(@Query('id') id: string) {
    const drug = await this.drugsService.getDrugById(id);
    return this.apiService.buildResponse(DRUG_GATHERED, drug);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteDrug(@Param('id') id: string) {
    await this.drugsService.deleteDrugById(id);
    return this.apiService.buildResponse(DRUG_DELETED);
  }
}
