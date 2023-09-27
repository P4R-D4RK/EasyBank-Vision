import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class credit_card {
  cc_number: string;
  cc_avaliable_credit: number;
  cc_total_credit: number;
}

export class debit_card {
  dc_number: string;
  dc_avaliable_balance: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_number: string;
  
  @IsNotEmpty()
  @IsString()
  first_name: string;
  
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  debit_card: debit_card;
  
  @IsNotEmpty()
  @IsOptional()
  credit_cards?: credit_card[];
  
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
