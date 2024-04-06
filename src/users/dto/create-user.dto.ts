import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'jhoeDue@email.com' })
  readonly email: string;

  @ApiProperty({ default: 'Jhoe due' })
  readonly fullName: string;

  @ApiProperty({ default: 'file', type: 'file' })
  readonly file: Express.Multer.File;

  @ApiProperty({ default: 'wallet' })
  readonly wallet: string;
}
