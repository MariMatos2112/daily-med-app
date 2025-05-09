// common/swagger/schemas/condition-swagger.schema.ts
import { ApiProperty } from '@nestjs/swagger';

export class IndicationSWSchema {
  @ApiProperty({ example: 'L20.89' })
  code: string;

  @ApiProperty({ example: 'Atopic Dermatitis' })
  name: string;

  @ApiProperty({
    example:
      'DUPIXENT is indicated for the treatment of adult and pediatric patients aged 6 months and older with moderate-to-severe atopic dermatitis (AD) whose disease is not adequately controlled with topical prescription therapies or when those therapies are not advisable. DUPIXENT can be used with or without topical corticosteroids.',
  })
  description: string;
}
