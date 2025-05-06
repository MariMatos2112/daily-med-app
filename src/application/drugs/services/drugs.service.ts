import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from 'src/infrastructure/persistence/drugs/drugs.entity';
import { Repository } from 'typeorm';
import {
  DAILY_MED_BASE_URL,
  DAILY_MED_PATHS,
} from 'src/common/constants/endpoints.contants';
import axios from 'axios';
import { DrugDto } from '../dto/drugs.dto';

const DAILY_MED_URL = DAILY_MED_BASE_URL + DAILY_MED_PATHS.SPLS;

interface IDailyMedResponse {
  data: {
    setid: string;
    title: string;
    published_date: string;
    spl_version: number;
  }[];
}

@Injectable()
export class DrugsService {
  constructor(
    @InjectRepository(DrugEntity)
    private readonly drugRepository: Repository<DrugEntity>,
  ) {}

  async searchDrugsByName(name: string) {
    const { data } = await axios.get<IDailyMedResponse>(DAILY_MED_URL, {
      params: { drug_name: name },
    });

    return data.data.map((item) => ({
      id: item.setid,
      title: item.title,
    }));
  }

  async createDrug(body: DrugDto) {
    const drug = await this.drugRepository.findOneBy({ id: body.id });
    if (drug) return drug;

    const created = this.drugRepository.create(body);
    return await this.drugRepository.save(created);
  }

  async getDrugById(id: string) {
    return await this.drugRepository.findOneBy({ id });
  }
}
