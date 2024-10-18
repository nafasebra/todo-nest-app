import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';
import { TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor(
    @InjectModel(Todo.name) private taskModel: Model<TodoDocument>,
  ) {}

  getAllTodos(status: string = "") {
    if (status === 'complete') {
      return this.taskModel.find({ isComplete: true }).exec();
    } else if (status === 'incomplete') {
      return this.taskModel.find({ isComplete: false }).exec();
    }
    return this.taskModel.find().exec(); 
  }

  getTodoById(id: number) {
    return this.taskModel.findById(id).exec();
  }

  createTodo(todo: Omit<Todo, 'id' | 'createdAt'>) {
    const newTodo = new this.taskModel({
      ...todo,
      createdAt: new Date(),
    });
    return newTodo.save();
  }

  updateTodo(id: number, updateData: Partial<Todo>) {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  deleteTodo(id: number) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  getCompletedTodos(): Todo[] {
    return this.todos.reduce((completed, todo) => 
      todo.done ? [...completed, todo] : completed, 
    [] as Todo[]);
  }

  getIncompleteTodos(): Todo[] {
    return this.todos.reduce((incomplete, todo) => 
      !todo.done ? [...incomplete, todo] : incomplete, 
    [] as Todo[]);
  }
}
