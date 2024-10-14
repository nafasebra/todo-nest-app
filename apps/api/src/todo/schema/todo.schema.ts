import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(Todo);

