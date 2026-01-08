import { Todo } from '../../../../domain/entities/todo';
import { TodoRepository } from '../../../../domain/repositories/todo/TodoRepository';

export class GetToDos {
  constructor(private readonly todoRepo: TodoRepository) {}

  execute(): Promise<Todo[]> {
    return this.todoRepo.getTodos();
  }
}

