import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    default: 'campaing title',
  })
  readonly campaignTitle: string;

  @ApiProperty({
    default: 'campaing id',
  })
  readonly campaignId: string;

  @ApiProperty({
    default: 'id do produto stripe',
  })
  readonly productId: string;

  @ApiProperty({
    default: 'id do usuario',
  })
  readonly userId: string;

  @ApiProperty({
    default: 'campaing price',
  })
  readonly campaignPrice: string;

  @ApiProperty({
    default: 'email do usuario',
  })
  readonly userEmail: string;
}
