import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export class credit_card {
  cc_number: string;
  cc_avaliable_credit: number;
  cc_total_credit: number;
}

export class debit_card {
    dc_number: string;
    dc_avaliable_balance: number;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  user_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  debit_card: debit_card;

  @Prop()
  credit_cards?: credit_card[];
  
  @Prop()
  password?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
