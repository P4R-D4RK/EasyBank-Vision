import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ServicePaymentDto {
  @IsNotEmpty()
  @IsString()
  cc_or_dc_number: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
