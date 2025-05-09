import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CLINICAL_TABLES_BASE_URL } from 'src/common/constants/endpoints.contants';

@Injectable()
export class Icd10Service {
  async getIcsd10Code(disease_name: string) {
    const response = await axios.get(`${CLINICAL_TABLES_BASE_URL}`, {
      params: { sf: 'code,name', terms: disease_name },
    });

    const items = response.data[3] as string[][];
    if (items.length === 0) return null;

    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .trim();
    const target = normalize(disease_name);

    const [code] =
      items.find(([, name]) => name === disease_name) ||
      items.find(([, name]) => normalize(name) === target) ||
      items.find(([, name]) => normalize(name).includes(target)) ||
      items[0];

    return code;
  }
}
