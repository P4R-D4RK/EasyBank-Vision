import { IsNotEmpty, IsString } from 'class-validator';

export class MovementsDto {
  @IsNotEmpty()
  @IsString()
  dc_number: string;
}