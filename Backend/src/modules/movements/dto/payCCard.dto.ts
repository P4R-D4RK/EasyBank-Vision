import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PayCCardDto {
  @IsNotEmpty()
  @IsString()
  dc_number: string;

  @IsNotEmpty()
  @IsString()
  cc_number: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
