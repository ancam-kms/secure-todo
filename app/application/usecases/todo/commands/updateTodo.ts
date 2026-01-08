import { Todo } from '../../../../domain/entities/todo';
import { TodoRepository } from '../../../../domain/repositories/todo/TodoRepository';


export class UpdateTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: Todo): Promise<Todo> {
    const existing = await this.todoRepository.getById(input.id);
    if (!existing) {
      throw new Error(`Todo with id ${input.id} not found`);
    }

    const updatedTodo: Todo = {
      ...existing,
      title: input.title !== undefined ? input.title : existing.title,
      description: input.description !== undefined ? input.description : existing.description,
      tag: input.tag !== undefined ? input.tag : existing.tag,
      dueDate: input.dueDate !== undefined ? input.dueDate || undefined : existing.dueDate,
      status: input.status !== undefined ? input.status : existing.status,
      subtasks: input.subtasks !== undefined ? input.subtasks : existing.subtasks,
      updatedDate: new Date(),
    };

    await this.todoRepository.updateTodo(updatedTodo);
    return updatedTodo;
  }
}
