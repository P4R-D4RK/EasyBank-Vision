import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class PaymentServiceDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  user_number?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  first_name?: string;
}
