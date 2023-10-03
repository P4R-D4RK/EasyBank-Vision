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

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  user_number?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  last_name?: string;

  @IsNotEmpty()
  @IsOptional()
  debit_card?: debit_card;

  @IsNotEmpty()
  @IsOptional()
  credit_cards?: credit_card[];

  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsOptional()
  movements?: Array<any>;
}
