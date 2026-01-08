// domain/repositories/TodoRepository.ts
import { PaginatedResult, PaginationParams } from "../../entities/pagination";
import { AddTodoInput, Todo } from "../../entities/todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  addTodo(todo: AddTodoInput): Promise<void>;
  deleteTodo(id: string): Promise<void>;
  updateTodo(todo: Todo): Promise<void>;
  getById(id: string): Promise<Todo | null>;
  getTodosPage(params: PaginationParams): Promise<PaginatedResult<Todo>>;
}
