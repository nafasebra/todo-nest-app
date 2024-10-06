import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { Todo } from './todo.model';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return all todos', () => {
      const result: Todo[] = [{ id: 1, title: 'test', done: false, createdAt: new Date(), priority: 'medium', tags: [] }];
      jest.spyOn(controller['todoService'], 'getAllTodos').mockImplementation(() => result);
      
      expect(controller.getAllTodos()).toBe(result);
    });
  });

  describe('getTodoById', () => {
    it('should return a specific todo by ID', () => {
      const result: Todo = { id: 1, title: 'test', done: false, createdAt: new Date(), priority: 'medium', tags: [] };
      jest.spyOn(controller['todoService'], 'getTodoById').mockImplementation(() => result);
      
      expect(controller.getTodoById('1')).toBe(result);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', () => {
      const newTodo: Omit<Todo, 'id' | 'createdAt'> = { title: 'new task', done: false, priority: 'high', tags: ['مهم'] };
      const result: Todo = { ...newTodo, id: 1, createdAt: new Date() };
      jest.spyOn(controller['todoService'], 'createTodo').mockImplementation(() => result);
      
      expect(controller.createTodo(newTodo)).toBe(result);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', () => {
      const updateData: Partial<Todo> = { title: 'updated' };
      const result: Todo = { id: 1, title: 'updated', done: false, createdAt: new Date(), priority: 'medium', tags: [] };
      jest.spyOn(controller['todoService'], 'updateTodo').mockImplementation(() => result);
      
      expect(controller.updateTodo('1', updateData)).toBe(result);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', () => {
      const result: Todo[] = [{ id: 2, title: 'old task', done: false, createdAt: new Date(), priority: 'low', tags: [] }];
      jest.spyOn(controller['todoService'], 'deleteTodo').mockImplementation(() => result);
      
      expect(controller.deleteTodo('1')).toBe(result);
    });
  });
});
