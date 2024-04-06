import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({
    default: 'title',
  })
  readonly title: string;

  @ApiProperty({
    default: 'id do usuario',
  })
  readonly userId: string;

  @ApiProperty({
    default: 'descriptio',
  })
  readonly description: string;

  @ApiProperty({ default: 'file', type: 'file' })
  readonly file: Express.Multer.File;

  @ApiProperty({
    default: 'price',
  })
  readonly price: string;
}
