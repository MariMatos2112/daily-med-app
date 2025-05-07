import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async scrapeDrugIndications(setid: string) {
    const url = `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const indications: string[] = [];

    $('.long-content .Section').each((_, el) => {
      const h2 = $(el).find('h2').first().text().trim();
      if (h2.startsWith('1.')) {
        const title = h2.replace(/^\d+(\.\d+)?\s*\t?/, '').trim();
        indications.push(title);
      }
    });

    return indications;
  }
}
