import { Controller, Patch } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schema/todo.schema';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Returns all todos' })
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('complete')
  @ApiOperation({ summary: 'Get all completed todos' })
  @ApiResponse({ status: 200, description: 'Returns all completed todos' })
  async getCompletedTodos() {
    return this.todoService.getCompletedTodos();
  }
  
  @Get('incomplete')
  @ApiOperation({ summary: 'Get all incomplete todos' })
  @ApiResponse({ status: 200, description: 'Returns all incomplete todos' })
  async getIncompleteTodos() {
    return this.todoService.getIncompleteTodos();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createTodo(@Body() todo: Omit<Todo, 'id' | 'createdAt'>) {
    return this.todoService.createTodo(todo);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async updateTodo(@Param('id') id: string, @Body() updateData: Partial<Todo>) {
    return this.todoService.updateTodo(id, updateData as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Toggle complete a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'Todo completion toggled successfully',
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async toggleCompletion(
    @Param('id') id: string,
    @Body() body: { done: boolean },
  ) {
    return this.todoService.updateTodo(id, { done: body.done });
  }
}
