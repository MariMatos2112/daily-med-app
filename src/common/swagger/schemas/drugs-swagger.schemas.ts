import { ApiProperty } from '@nestjs/swagger';

export class DrugsSWSchema {
  @ApiProperty({ example: '595f437d-2729-40bb-9c62-c8ece1f82780' })
  id: string;

  @ApiProperty({
    example:
      'DUPIXENT (DUPILUMAB) INJECTION, SOLUTION [SANOFI-AVENTIS U.S. LLC]',
  })
  title: string;
}
