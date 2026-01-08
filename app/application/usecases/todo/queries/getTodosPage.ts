import { TodoRepository } from '../../../../domain/repositories/todo/TodoRepository';
import {
  DEFAULT_TODO_LIMIT,
  DEFAULT_TODO_OFFSET,
} from '../../../constants/pagination';

export class GetTodosPage {
  constructor(private repo: TodoRepository) {}

  execute(
    offset: number = DEFAULT_TODO_OFFSET,
    limit: number = DEFAULT_TODO_LIMIT
  ) {
    return this.repo.getTodosPage({ offset, limit });
  }
}
