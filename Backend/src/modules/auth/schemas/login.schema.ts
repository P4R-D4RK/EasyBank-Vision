import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Login {
  @Prop({ required: true, unique: true })
  user_number: string;

  @Prop({ required: true })
  password?: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
