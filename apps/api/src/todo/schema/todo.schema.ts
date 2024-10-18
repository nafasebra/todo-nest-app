import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: false })
  done: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, enum: ['low', 'medium', 'high'] })
  priority: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

