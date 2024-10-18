import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, updateData: Partial<Todo>): Todo | undefined {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return undefined;

    const updatedTodo = { ...this.todos[todoIndex], ...updateData };
    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  deleteTodo(id: number): Todo[] {
    return this.todos = this.todos.filter(todo => todo.id !== id);
  }

  getCompletedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.done === true)
  }
  
  getIncompleteTodos(): Todo[] {
    return this.todos.filter((todo) => todo.done !== true)
  }
}
