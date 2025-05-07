import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async scrapeDrugIndications(setid: string) {
    const url = `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const indications: { name: string; description: string }[] = [];

    $('.long-content .Section').each((_, el) => {
      const $section = $(el);
      const $h2 = $section.find('h2').first();
      const h2Text = $h2.text().trim();

      if (h2Text.startsWith('1.')) {
        const name = h2Text.replace(/^\d+(\.\d+)?\s*\t?/, '').trim();

        const $description = $h2.nextAll('p').first();
        const description = $description.text().trim();

        indications.push({ name, description });
      }
    });

    return indications;
  }
}
