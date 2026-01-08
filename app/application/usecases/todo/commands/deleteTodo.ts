import { TodoRepository } from '../../../../domain/repositories/todo/TodoRepository';

export class DeleteTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    await this.todoRepository.deleteTodo(id);
  }
}
