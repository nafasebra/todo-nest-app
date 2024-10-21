import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';
import { TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private todoModel: Model<TodoDocument>,
  ) {}

  getAllTodos() {
    return this.todoModel.find().exec(); 
  }

  createTodo(todo: Omit<Todo, 'id' | 'createdAt'>) {
    const newTodo = new this.todoModel({
      ...todo,
      done: false,
      createdAt: new Date(),
    });
    console.log(newTodo)
    return newTodo.save();
  }

  updateTodo(id: string, updateData: Partial<Todo>) {
    return this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  deleteTodo(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }

  getCompletedTodos() {
    return this.todoModel.find({ done: true }).exec();
  }
  
  getIncompleteTodos() {
    return this.todoModel.find({ done: false }).exec();
  }
}
