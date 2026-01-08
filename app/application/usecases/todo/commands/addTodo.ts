import { AddTodoInput, Todo } from '../../../../domain/entities/todo';
import { TodoRepository } from '../../../../domain/repositories/todo/TodoRepository';

export class AddTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: AddTodoInput): Promise<Todo> {
    const now = new Date();
    
    const todo: Todo = {
      id: this.generateId(),
      title: input.title,
      description: input.description,
      tag: input.tag,
      createdDate: now,
      dueDate: input.dueDate,
      status: input.status || 'PENDING',
      subtasks: input.subtasks || [],
    };

    await this.todoRepository.addTodo(todo);
    return todo;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

