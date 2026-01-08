import { TodoRepository } from "../..//domain/repositories/todo/TodoRepository";
import { Todo } from "../../domain/entities/todo";
import { storage } from "../storage/mmkv";

const TODO_BY_ID_KEY = (id: string) => `TODO_BY_ID_${id}`;
const TODO_IDS_KEY = "TODO_IDS";

export class MMKVTodoRepository implements TodoRepository {
  private getIds(): string[] {
    const raw = storage.getString(TODO_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async getById(id: string): Promise<Todo | null> {
    const raw = storage.getString(TODO_BY_ID_KEY(id));
    if (!raw) return null;
    return JSON.parse(raw);
  }

  async getTodos(): Promise<Todo[]> {
    const idsRaw = storage.getString(TODO_IDS_KEY);
    if (!idsRaw) return [];

    const ids: string[] = JSON.parse(idsRaw);

    const todos: Todo[] = [];

    for (const id of ids) {
      const raw = storage.getString(TODO_BY_ID_KEY(id));
      if (raw) {
        const parsed: Todo = JSON.parse(raw);
        todos.push(parsed);
      }
    }
    return todos;    
  }

  async getTodosPage({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    data: Todo[];
    total: number;
    hasMore: boolean;
  }> {
    const ids = this.getIds();
    const total = ids.length;

    const slice = ids.slice(offset, offset + limit);

    const data: Todo[] = [];

    for (const id of slice) {
      const raw = storage.getString(TODO_BY_ID_KEY(id));
      if (raw) {
        data.push(JSON.parse(raw));
      }
    }
    return {
      data,
      total,
      hasMore: offset + limit < total,
    };
  }

  async addTodo(todo: Todo): Promise<void> {
    const ids = this.getIds();
    if (!ids.includes(todo.id)) {
      ids.push(todo.id);
      storage.set(TODO_IDS_KEY, JSON.stringify(ids));
    }
    const createdDate = new Date();
    // if (todo.dueDate) {
    //     todo.dueDate = todo.dueDate.toISOString();
    // }
    storage.set(
      TODO_BY_ID_KEY(todo.id),
      JSON.stringify({ ...todo, createdDate: createdDate.toISOString() })
    );
  }

  async updateTodo(todo: Todo): Promise<void> {
    const existing = await this.getById(todo.id);
    if (!existing) return;
    const updatedDate = new Date();
    storage.set(
      TODO_BY_ID_KEY(todo.id),
      JSON.stringify({
        ...todo,
        updatedDate: updatedDate.toISOString(),
      })
    );
  }

  async deleteTodo(id: string): Promise<void> {
    const ids = this.getIds().filter((tid) => tid !== id);
    storage.set(TODO_IDS_KEY, JSON.stringify(ids));
    storage.remove(TODO_BY_ID_KEY(id));
  }
}
