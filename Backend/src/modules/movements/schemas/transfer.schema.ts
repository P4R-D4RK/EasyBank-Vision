import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transfer {
  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  ammount: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
