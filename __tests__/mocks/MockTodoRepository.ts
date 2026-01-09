import { TodoRepository } from '../../app/domain/repositories/todo/TodoRepository';
import { Todo, AddTodoInput } from '../../app/domain//entities/todo';
import { PaginationParams } from '../../app/domain//entities/pagination';

export class MockTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async getTodos(): Promise<Todo[]> {
    return [...this.todos];
  }

  async addTodo(input: AddTodoInput): Promise<Todo> {
    const todo = {
      ...input,
      id: this.generateId(),
      createdDate: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    this.todos = this.todos.map(t => (t.id === todo.id ? todo : t));
    return todo;
  }

  async getById(id: string): Promise<Todo | null> {
    return this.todos.find(t => t.id === id) ?? null;
  }

  async getTodosPage({ offset, limit }: PaginationParams) {
    const data = this.todos.slice(offset, offset + limit);

    return {
      data,
      hasMore: offset + limit < this.todos.length,
      total: this.todos.length,
    };
  }

  // helper
  seed(todos: Todo[]) {
    this.todos = todos;
  }
}
