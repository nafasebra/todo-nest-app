export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}