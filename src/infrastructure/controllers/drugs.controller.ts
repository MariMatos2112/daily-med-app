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

@UseGuards(JwtAuthGuard)
@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Get('/search')
  async searchDrugs(@Query('name') name: string) {
    return await this.drugsService.searchDrugsByName(name);
  }

  @Post()
  async createDrug(@Body() body: DrugDto) {
    return await this.drugsService.createDrug(body);
  }

  @Get(':id')
  async getDrugById(@Query('id') id: string) {
    return await this.drugsService.getDrugById(id);
  }

  @Delete(':id')
  async deleteDrug(@Param('id') id: string) {
    return await this.drugsService.deleteDrugById(id);
  }
}
