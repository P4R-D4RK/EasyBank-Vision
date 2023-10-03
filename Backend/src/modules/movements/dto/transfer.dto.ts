import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
