import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LogInDto {
  @IsOptional()
  user_number_or_cc?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
